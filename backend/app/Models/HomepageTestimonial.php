<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;

class HomepageTestimonial extends Model
{
    use HasFactory, AsSource;

    protected $fillable = [
        'country_code',
        'name',
        'country',
        'description',
        'rating',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
