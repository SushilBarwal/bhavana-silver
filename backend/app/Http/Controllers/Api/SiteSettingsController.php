<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingsController extends Controller    
{
    /**
     * Get header configuration
     */
    public function getHeader(): JsonResponse
    {
        $headerConfig = SiteSetting::get('header_config', [
            'logo' => '/storage/logo.png',
            'menu_items' => []
        ]);

        // Hydrate sub-menus if category_ids or product_ids are present
        if (!empty($headerConfig['menu_items'])) {
            foreach ($headerConfig['menu_items'] as &$item) {
                $submenu = [
                    'categories' => [],
                    'products' => [],
                ];
                $hasContent = false;

                // Handle Categories (Tree)
                if (!empty($item['category_ids']) && is_array($item['category_ids'])) {
                     $categories = \App\Models\Category::with(['children.children'])
                        ->whereIn('id', $item['category_ids'])
                        ->orderBy('order')
                        ->get();

                     if ($categories->count() > 0) {
                        $submenu['categories'] = $categories->map(function($category) {
                            return [
                                'id' => $category->id,
                                'name' => $category->name,
                                'slug' => $category->slug,
                                // Nesting children
                                'children' => $category->children->map(function($child) {
                                    return [
                                        'id' => $child->id,
                                        'name' => $child->name,
                                        'slug' => $child->slug,
                                        'children' => $child->children->map(function($grandChild) {
                                            return [
                                                'id' => $grandChild->id,
                                                'name' => $grandChild->name,
                                                'slug' => $grandChild->slug,
                                            ];
                                        })
                                    ];
                                })
                            ];
                        });
                        $hasContent = true;
                     }
                }
                
                // Handle Products - Load manually selected products
                if (!empty($item['product_ids']) && is_array($item['product_ids'])) {
                    $products = \App\Models\Product::whereIn('id', $item['product_ids'])
                        ->select('id', 'name', 'slug', 'price', 'sale_price', 'available_for_ship_now', 'image')
                        ->get();
                    
                    if ($products->count() > 0) {
                        $submenu['products'] = $products->map(function($product) {
                            return [
                                'id' => $product->id,
                                'name' => $product->name,
                                'slug' => $product->slug,
                                'price' => $product->price,
                                'sale_price' => $product->sale_price,
                                'shop_now' => (bool) $product->available_for_ship_now,
                                'image' => $product->image ? asset('storage/' . $product->image) : null,
                            ];
                        });
                        $hasContent = true;
                    }
                }


                // Add submenu only if there's content (categories or products)
                if ($hasContent) {
                    $item['submenu'] = $submenu;
                } else {
                    // Even if no submenu, include empty submenu structure
                    $item['submenu'] = [
                        'categories' => [],
                        'products' => []
                    ];
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => $headerConfig
        ]);
    }

    /**
     * Get footer configuration
     */
    public function getFooter(): JsonResponse
    {
        $footerConfig = SiteSetting::get('footer_config', [
            'columns' => [],
            'social_links' => [],
            'contact_info' => [],
            'copyright' => '',
            'payment_methods' => []
        ]);

        return response()->json([
            'success' => true,
            'data' => $footerConfig
        ]);
    }

    /**
     * Get all site settings
     */
    public function getAll(): JsonResponse
    {
        $settings = SiteSetting::all()->groupBy('group')->map(function ($group) {
            return $group->pluck('value', 'key');
        });

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Get site info (name, tagline, etc.)
     */
    public function getSiteInfo(): JsonResponse
    {
        $siteInfo = SiteSetting::get('site_info', [
            'site_name' => 'Bhavana Silver Jewellers',
            'tagline' => '',
            'description' => ''
        ]);

        return response()->json([
            'success' => true,
            'data' => $siteInfo
        ]);
    }
}
