<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HomepageController;
use App\Http\Controllers\Api\TokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * NEW: Wishlist & Auth Routes
 */

// Public Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected User Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{product_id}', [WishlistController::class, 'destroy']);
});

/**
 * MOVED: Legacy/App Routes (v1)
 */
Route::prefix('v1')->group(function () {
    // Public Token Generation Route
    Route::post('/auth/token', [TokenController::class, 'generate']);
    
    // Public Homepage Route
    Route::get('/homepage/all', [HomepageController::class, 'getAllSections']);

    // Protected Routes
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
