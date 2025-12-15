<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;

Route::get('/', function () {
    return redirect('/admin');
});

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('view:clear');
    return "Cache cleared!";
});
// API Routes moved to api.php
