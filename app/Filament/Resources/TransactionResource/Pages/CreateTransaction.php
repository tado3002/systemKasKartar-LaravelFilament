<?php

namespace App\Filament\Resources\TransactionResource\Pages;

use App\Filament\Resources\TransactionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\File;

class CreateTransaction extends CreateRecord
{
    protected static string $resource = TransactionResource::class;
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (isset($data['attachment'])) {
            $filePath = storage_path('app/public/storage' . $data['attachment']);
            if (file_exists($filePath)) {
                $data['attachment_mime_type'] = File::extension($filePath);
                $data['attachment_size']  = filesize($filePath);
            }
        }
        return $data;
    }
}
