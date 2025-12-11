<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;
use Orchid\Filters\Filterable;

class HomepageBestSeller extends Model
{
    use HasFactory, AsSource, Filterable;

    protected $fillable = [
        'title',
        'category_ids',
        'product_selections',
        'order',
        'is_active',
    ];

    protected $casts = [
        'category_ids' => 'array',
        'product_selections' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    protected $allowedSorts = [
        'title',
        'order',
        'is_active',
    ];
}
