<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomepageAboutSlide;
use App\Models\HomepageCertificate;
use App\Models\HomepageCollection;
use App\Models\HomepageFeature;
use App\Models\HomepageGemstone;
use App\Models\HomepageHeroSlide;
use App\Models\HomepageSetting;
use App\Models\HomepageTestimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    /**
     * Get all homepage sections data.
     *
     * @return JsonResponse
     */
    public function getAllSections(): JsonResponse
    {
        \Log::info('Homepage API endpoint hit');
        
        // Helper to fix image URLs
        $fixUrl = function ($path) {
            if (empty($path)) return $path;
            if (str_starts_with($path, 'http')) return $path;
            return url($path);
        };

        // Fetch all active sections ordered by their sort order
        $heroSlides = HomepageHeroSlide::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                $item->image = $fixUrl($item->image);
                return $item;
            });

        $collections = HomepageCollection::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                $item->image = $fixUrl($item->image);
                return $item;
            });

        $gemstones = HomepageGemstone::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                $item->image = $fixUrl($item->image);
                return $item;
            });

        $aboutSlides = HomepageAboutSlide::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                $item->image = $fixUrl($item->image);
                return $item;
            });

        $features = HomepageFeature::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                // Feature icon can be a class or an image path
                if (str_starts_with($item->icon, '/') || str_starts_with($item->icon, 'storage')) {
                    $item->icon = $fixUrl($item->icon);
                }
                return $item;
            });

        $testimonials = HomepageTestimonial::where('is_active', true)->orderBy('order')->get();
        
        $certificates = HomepageCertificate::where('is_active', true)->orderBy('order')->get()
            ->map(function ($item) use ($fixUrl) {
                $item->image = $fixUrl($item->image);
                return $item;
            });

        // Fetch Best Sellers sections
        $bestSellers = \App\Models\HomepageBestSeller::where('is_active', true)->orderBy('order')->get()
            ->map(function ($section) use ($fixUrl) {
                $categoryIds = $section->category_ids ?? [];
                $productSelections = $section->product_selections ?? []; // key = category_id, value = array of product_ids

                $categories = \App\Models\Category::whereIn('id', $categoryIds)->get()
                    ->map(function ($category) use ($fixUrl, $productSelections) {
                        
                        $selectedProductIds = $productSelections[$category->id] ?? [];
                        
                        $query = \App\Models\Product::where('category_id', $category->id)
                            ->with(['attachment', 'stone']);

                        if (!empty($selectedProductIds)) {
                             // If manually selected, fetch only those
                             $query->whereIn('id', $selectedProductIds);
                        } else {
                             // Fallback to recent 8
                             $query->limit(8);
                        }

                        $products = $query->get()
                            ->map(function ($product) use ($fixUrl) {
                                // Apply image fix to products
                                if ($product->image) {
                                    $product->image = $fixUrl($product->image);
                                }
                                return $product;
                            });
                        
                        $category->products = $products;
                        return $category;
                    });
                
                $section->categories = $categories;
                return $section;
            });
        
        // Fetch settings and format as key-value pairs
        $settingsQuery = HomepageSetting::all();
        $settings = [];
        foreach ($settingsQuery as $setting) {
            $value = $setting->value;
            // Check for known image keys in settings
            if (in_array($setting->key, ['appointment_bg_image'])) {
                $value = $fixUrl($value);
            }
            $settings[$setting->key] = $value;
        }

        return response()->json([
            'success' => true,
            'debug_info' => [
                'hero_count' => $heroSlides->count(),
                'collection_count' => $collections->count(),
                'best_seller_count' => $bestSellers->count(),
            ],
            'data' => [
                'hero_slides' => $heroSlides,
                'collections' => $collections,
                'gemstones' => $gemstones,
                'about_slides' => $aboutSlides,
                'features' => $features,
                'testimonials' => $testimonials,
                'certificates' => $certificates,
                'best_sellers' => $bestSellers,
                'settings' => $settings,
            ]
        ]);
    }
}
