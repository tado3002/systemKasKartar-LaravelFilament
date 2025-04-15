<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransactionResource\Pages;
use App\Filament\Resources\TransactionResource\RelationManagers\AttachmentsRelationManager;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rules\File;

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-m-banknotes';
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with(['user', 'category']);
    }
    public static function canAccess(): bool
    {
        return !(auth()->user()->role == 'member');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('User')
                    ->searchable()
                    ->relationship('user', 'name')
                    ->options(User::all()->take(5)->pluck('name', 'id'))
                    ->required(),
                Forms\Components\Radio::make('type')
                    ->label('Type')
                    ->options([
                        '1' => 'Pengeluaran',
                        '0' => 'Pemasukan',
                    ])
                    ->live()
                    ->afterStateHydrated(function ($component, $state) {
                        $component->state((string) (int) $state); // memastikan nilainya di-cast ke string '1' atau '0'
                    }),
                Forms\Components\Select::make('category_id')
                    ->label('Kategori')
                    ->default(fn($record) => $record->category_id ?? null)
                    ->relationship('category', 'name')
                    ->options(
                        function (Get $get, $record) {
                            if ($record) return Category::pluck('name', 'id');
                            $is_expense = $get('type');
                            return Category::where('is_expense', $is_expense)->pluck('name', 'id');
                        }
                    )
                    ->required(),
                Forms\Components\TextInput::make('amount')
                    ->label('Rp.')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('note')
                    ->label('Catatan (Opsional)')
                    ->maxLength(255),
                Forms\Components\FileUpload::make('attachment')
                    ->label('Lampiran (Opsional)')
                    ->directory('transaksi-lampiran') // Folder di storage/app/public
                    ->preserveFilenames()
                    ->acceptedFileTypes([
                        'application/pdf',
                        'image/jpeg',
                        'image/png',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ])
                    ->maxSize(2048) // 2MB
                    ->openable()
                    ->downloadable()
                    ->previewable()
                    ->helperText('Format: PDF, JPG, PNG, DOCX (Maks. 2MB)')
                    ->columnSpanFull()
                    ->rules([
                        File::types(['pdf', 'jpeg', 'png', 'docx'])
                            ->max(2048), // 2MB
                    ])
                    ->validationMessages([
                        'lampiran.mimes' => 'Hanya format PDF, JPG, PNG, atau DOCX yang diperbolehkan',
                        'lampiran.max' => 'Ukuran file maksimal 2MB',
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('amount')
                    ->label('Nominal')
                    ->money('Rp.')
                    ->icon(fn(Transaction $transaction): string => $transaction->category->is_expense ? 'heroicon-o-minus' : 'heroicon-o-plus')
                    ->color(fn(Transaction $transaction): string => $transaction->category->is_expense ? 'danger' : 'success')
                    ->description(fn(Transaction $transaction): string => $transaction->user->name)
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->description(fn(Transaction $transaction): string => $transaction->category->is_expense ? 'Pengeluaran' : 'Pemasukan')
                    ->sortable(),
                Tables\Columns\TextColumn::make('note')
                    ->searchable()
                    ->description(fn(Transaction $transaction) => $transaction->attachment),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTransactions::route('/'),
            'create' => Pages\CreateTransaction::route('/create'),
            'edit' => Pages\EditTransaction::route('/{record}/edit'),
        ];
    }
}
