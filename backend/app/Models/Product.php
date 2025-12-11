<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Types\Like;
use Orchid\Filters\Types\WhereBetween;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

class Product extends Model
{
    use HasFactory, AsSource, Filterable, Attachable;

    protected $fillable = [
        'code',
        'slug',
        'name',
        'price',
        'max_price',
        'sale_price',
        'available_for_ship_now',
        'short_description',
        'description',
        'details',
        'category_id',
        'stone_id',
        'image',
        'stone_size',
        'dimensions',
        'plating',
        'weight',
    ];

    protected $casts = [
        'details' => 'array',
        'price' => 'decimal:2',
        'max_price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'available_for_ship_now' => 'boolean',
    ];

    protected $allowedFilters = [
        'code' => Like::class,
        'name' => Like::class,
        'price' => WhereBetween::class,
        'category.name' => Like::class,
        'stone.name' => Like::class,
    ];

    protected $allowedSorts = [
        'code', 'name', 'price', 'created_at', 'category.name', 'stone.name'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function stone()
    {
        return $this->belongsTo(Stone::class);
    }

    /**
     * Scope a query to only include products of a given category.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $categoryId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}
