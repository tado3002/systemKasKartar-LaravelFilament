<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    protected $fillable = [
        'name',
        'is_expense',
        'description',
        'image'
    ];
}
