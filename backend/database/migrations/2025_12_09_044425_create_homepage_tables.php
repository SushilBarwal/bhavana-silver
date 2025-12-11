<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Hero Slides
        Schema::create('homepage_hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Shop Collections
        Schema::create('homepage_collections', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('url')->nullable(); 
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Gemstones
        Schema::create('homepage_gemstones', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('name');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. About Slides
        Schema::create('homepage_about_slides', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. Why Choose Us (Features)
        Schema::create('homepage_features', function (Blueprint $table) {
            $table->id();
            $table->string('icon'); // Image path or class
            $table->string('heading');
            $table->text('description');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Testimonials
        Schema::create('homepage_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('country_code', 5)->nullable();
            $table->string('name');
            $table->string('country');
            $table->text('description');
            $table->integer('rating')->default(5);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 9. Certificates
        Schema::create('homepage_certificates', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // General Settings (Best Seller, Appointment, etc)
        Schema::create('homepage_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homepage_hero_slides');
        Schema::dropIfExists('homepage_collections');
        Schema::dropIfExists('homepage_gemstones');
        Schema::dropIfExists('homepage_about_slides');
        Schema::dropIfExists('homepage_features');
        Schema::dropIfExists('homepage_testimonials');
        Schema::dropIfExists('homepage_certificates');
        Schema::dropIfExists('homepage_settings');
    }
};
