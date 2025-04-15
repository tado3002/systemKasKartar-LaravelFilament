<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'note',
        'attachment',
        'attachment_mime_type',
        'attachment_size',
    ];

    /**
     * Get the URL for the attachment
     */
    public function getAttachmentUrlAttribute()
    {
        if ($this->attachment) {
            return asset('storage/' . $this->attachment);
        }
        return null;
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the human readable file size
     */
    public function getAttachmentSizeFormattedAttribute()
    {
        if ($this->attachment) {
            $filePath = storage_path('app/public/' . $this->attachment);
            $size = filesize($filePath);
            if ($size >= 1073741824) {
                return number_format($size / 1073741824, 2) . ' GB';
            } elseif ($size >= 1048576) {
                return number_format($size / 1048576, 2) . ' MB';
            } elseif ($size >= 1024) {
                return number_format($size / 1024, 2) . ' KB';
            } else {
                return $size . ' bytes';
            }
        }
        return null;
    }
    protected static function booted()
    {
        static::updating(function (Transaction $transaction) {
            // Hapus lampiran lama jika diupdate
            if ($transaction->isDirty('lampiran') && $transaction->getOriginal('lampiran')) {
                Storage::disk('public')->delete($transaction->getOriginal('lampiran'));
            }
        });

        static::deleted(function (Transaction $transaction) {
            // Hapus lampiran saat transaksi dihapus
            if ($transaction->lampiran) {
                Storage::disk('public')->delete($transaction->lampiran);
            }
        });
        static::saving(function ($transaction) {
            if ($transaction->attachment) {
                $path = Storage::disk('public')->path($transaction->attachment);

                if (file_exists($path)) {
                    $transaction->attachment_mime_type = mime_content_type($path);
                    $transaction->attachment_size = filesize($path);
                }
            }
        });
    }
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
