<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Orchid\Filters\Filterable;

class HomepageGemstone extends Model
{
    use HasFactory, AsSource, Filterable;

    protected $fillable = [
        'name',
        'image',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    protected $allowedSorts = [
        'name',
        'order',
        'is_active',
        'created_at',
    ];

    protected $allowedFilters = [
        'name',
    ];
}
