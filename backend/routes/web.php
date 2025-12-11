<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;

Route::get('/', function () {
    return view('welcome');
});

// API Routes
Route::prefix('api/v1')->group(function () {
    // Public Token Generation Route
    Route::post('/auth/token', [App\Http\Controllers\Api\TokenController::class, 'generate']);
    
    // Public Homepage Route (No Auth Required for viewing homepage)
    Route::get('/homepage/all', [App\Http\Controllers\Api\HomepageController::class, 'getAllSections']);

    // Protected Routes (Require Authentication)
    Route::middleware('auth:sanctum')->group(function () {
        
        // Site Settings Routes
        Route::get('/site-settings/header', [SiteSettingsController::class, 'getHeader']);
        Route::get('/site-settings/footer', [SiteSettingsController::class, 'getFooter']);
        Route::get('/site-settings/all', [SiteSettingsController::class, 'getAll']);
        Route::get('/site-settings/info', [SiteSettingsController::class, 'getSiteInfo']);
        
        // Product API Routes
        Route::get('/products', [ProductController::class, 'index']);
        Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
        Route::get('/products/{id}', [ProductController::class, 'show']);
        
        // Category API Routes
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/categories/{id}', [CategoryController::class, 'show']);
    });
});
