<?php

declare(strict_types=1);

// Removed example screen imports
use App\Orchid\Screens\PlatformScreen;
use App\Orchid\Screens\Role\RoleEditScreen;
use App\Orchid\Screens\Role\RoleListScreen;
use App\Orchid\Screens\Product\ProductEditScreen;
use App\Orchid\Screens\Product\ProductListScreen;
use App\Orchid\Screens\Category\CategoryEditScreen;
use App\Orchid\Screens\Category\CategoryListScreen;
use App\Orchid\Screens\User\UserEditScreen;
use App\Orchid\Screens\User\UserListScreen;
use App\Orchid\Screens\User\UserProfileScreen;
use App\Orchid\Screens\SiteSettings\HeaderSettingsScreen;
use App\Orchid\Screens\SiteSettings\FooterSettingsScreen;
use App\Orchid\Screens\Stone\StoneEditScreen;
use App\Orchid\Screens\Stone\StoneListScreen;
use Illuminate\Support\Facades\Route;
use Tabuna\Breadcrumbs\Trail;

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the need "dashboard" middleware group. Now create something great!
|
*/

// Main
Route::screen('/main', PlatformScreen::class)
    ->name('platform.main');

// Platform > Profile
Route::screen('profile', UserProfileScreen::class)
    ->name('platform.profile')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Profile'), route('platform.profile')));

// Platform > System > Users > User
Route::screen('users/{user}/edit', UserEditScreen::class)
    ->name('platform.systems.users.edit')
    ->breadcrumbs(fn (Trail $trail, $user) => $trail
        ->parent('platform.systems.users')
        ->push($user->name, route('platform.systems.users.edit', $user)));

// Platform > System > Users > Create
Route::screen('users/create', UserEditScreen::class)
    ->name('platform.systems.users.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.users')
        ->push(__('Create'), route('platform.systems.users.create')));

// Platform > System > Users
Route::screen('users', UserListScreen::class)
    ->name('platform.systems.users')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Users'), route('platform.systems.users')));

// Platform > System > Roles > Role
Route::screen('roles/{role}/edit', RoleEditScreen::class)
    ->name('platform.systems.roles.edit')
    ->breadcrumbs(fn (Trail $trail, $role) => $trail
        ->parent('platform.systems.roles')
        ->push($role->name, route('platform.systems.roles.edit', $role)));

// Platform > System > Roles > Create
Route::screen('roles/create', RoleEditScreen::class)
    ->name('platform.systems.roles.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.roles')
        ->push(__('Create'), route('platform.systems.roles.create')));

// Platform > System > Roles
Route::screen('roles', RoleListScreen::class)
    ->name('platform.systems.roles')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Roles'), route('platform.systems.roles')));

// Example routes removed

// Products
Route::screen('products', ProductListScreen::class)
    ->name('platform.products');

Route::screen('products/create', ProductEditScreen::class)
    ->name('platform.products.create');

Route::screen('products/{product}/edit', ProductEditScreen::class)
    ->name('platform.products.edit');

// Categories
Route::screen('categories', CategoryListScreen::class)
    ->name('platform.categories')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Categories', route('platform.categories')));

Route::screen('categories/create', CategoryEditScreen::class)
    ->name('platform.categories.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.categories')
        ->push('Create', route('platform.categories.create')));

Route::screen('categories/{category}/edit', CategoryEditScreen::class)
    ->name('platform.categories.edit')
    ->breadcrumbs(fn (Trail $trail, $category) => $trail
        ->parent('platform.categories')
        ->push($category->name, route('platform.categories.edit', $category)));

// Stones
Route::screen('stones', StoneListScreen::class)
    ->name('platform.stones')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Stones', route('platform.stones')));

Route::screen('stones/create', StoneEditScreen::class)
    ->name('platform.stones.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.stones')
        ->push('Create', route('platform.stones.create')));

Route::screen('stones/{stone}/edit', StoneEditScreen::class)
    ->name('platform.stones.edit')
    ->breadcrumbs(fn (Trail $trail, $stone) => $trail
        ->parent('platform.stones')
        ->push($stone->name, route('platform.stones.edit', $stone)));

// Site Settings
Route::screen('settings/header', HeaderSettingsScreen::class)
    ->name('platform.settings.header')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Header Settings', route('platform.settings.header')));

Route::screen('settings/footer', FooterSettingsScreen::class)
    ->name('platform.settings.footer')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Footer Settings', route('platform.settings.footer')));

// Homepage Management
Route::screen('homepage/hero', \App\Orchid\Screens\Homepage\HeroSlideListScreen::class)
    ->name('platform.homepage.hero.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Hero Slides', route('platform.homepage.hero.list')));

Route::screen('homepage/hero/create', \App\Orchid\Screens\Homepage\HeroSlideEditScreen::class)
    ->name('platform.homepage.hero.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.hero.list')
        ->push('Create', route('platform.homepage.hero.create')));

Route::screen('homepage/hero/{slide}/edit', \App\Orchid\Screens\Homepage\HeroSlideEditScreen::class)
    ->name('platform.homepage.hero.edit')
    ->breadcrumbs(fn (Trail $trail, $slide) => $trail
        ->parent('platform.homepage.hero.list')
        ->push($slide->title, route('platform.homepage.hero.edit', $slide)));

Route::screen('homepage/collections', \App\Orchid\Screens\Homepage\CollectionListScreen::class)
    ->name('platform.homepage.collection.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Shop By Collection', route('platform.homepage.collection.list')));

Route::screen('homepage/collections/create', \App\Orchid\Screens\Homepage\CollectionEditScreen::class)
    ->name('platform.homepage.collection.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.collection.list')
        ->push('Create', route('platform.homepage.collection.create')));

Route::screen('homepage/collections/{collection}/edit', \App\Orchid\Screens\Homepage\CollectionEditScreen::class)
    ->name('platform.homepage.collection.edit')
    ->breadcrumbs(fn (Trail $trail, $collection) => $trail
        ->parent('platform.homepage.collection.list')
        ->push($collection->title, route('platform.homepage.collection.edit', $collection)));

Route::screen('homepage/gemstones', \App\Orchid\Screens\Homepage\GemstoneListScreen::class)
    ->name('platform.homepage.gemstone.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Gemstones', route('platform.homepage.gemstone.list')));

Route::screen('homepage/gemstones/create', \App\Orchid\Screens\Homepage\GemstoneEditScreen::class)
    ->name('platform.homepage.gemstone.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.gemstone.list')
        ->push('Create', route('platform.homepage.gemstone.create')));

Route::screen('homepage/gemstones/{gemstone}/edit', \App\Orchid\Screens\Homepage\GemstoneEditScreen::class)
    ->name('platform.homepage.gemstone.edit')
    ->breadcrumbs(fn (Trail $trail, $gemstone) => $trail
        ->parent('platform.homepage.gemstone.list')
        ->push($gemstone->name, route('platform.homepage.gemstone.edit', $gemstone)));

Route::screen('homepage/about', \App\Orchid\Screens\Homepage\AboutSlideListScreen::class)
    ->name('platform.homepage.about.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('About Us Slides', route('platform.homepage.about.list')));

Route::screen('homepage/about/create', \App\Orchid\Screens\Homepage\AboutSlideEditScreen::class)
    ->name('platform.homepage.about.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.about.list')
        ->push('Create', route('platform.homepage.about.create')));

Route::screen('homepage/about/{slide}/edit', \App\Orchid\Screens\Homepage\AboutSlideEditScreen::class)
    ->name('platform.homepage.about.edit')
    ->breadcrumbs(fn (Trail $trail, $slide) => $trail
        ->parent('platform.homepage.about.list')
        ->push($slide->title, route('platform.homepage.about.edit', $slide)));

Route::screen('homepage/features', \App\Orchid\Screens\Homepage\FeatureListScreen::class)
    ->name('platform.homepage.feature.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Why Choose Us', route('platform.homepage.feature.list')));

Route::screen('homepage/features/create', \App\Orchid\Screens\Homepage\FeatureEditScreen::class)
    ->name('platform.homepage.feature.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.feature.list')
        ->push('Create', route('platform.homepage.feature.create')));

Route::screen('homepage/features/{feature}/edit', \App\Orchid\Screens\Homepage\FeatureEditScreen::class)
    ->name('platform.homepage.feature.edit')
    ->breadcrumbs(fn (Trail $trail, $feature) => $trail
        ->parent('platform.homepage.feature.list')
        ->push($feature->heading, route('platform.homepage.feature.edit', $feature)));

Route::screen('homepage/testimonials', \App\Orchid\Screens\Homepage\TestimonialListScreen::class)
    ->name('platform.homepage.testimonial.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Testimonials', route('platform.homepage.testimonial.list')));

Route::screen('homepage/testimonials/create', \App\Orchid\Screens\Homepage\TestimonialEditScreen::class)
    ->name('platform.homepage.testimonial.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.testimonial.list')
        ->push('Create', route('platform.homepage.testimonial.create')));

Route::screen('homepage/testimonials/{testimonial}/edit', \App\Orchid\Screens\Homepage\TestimonialEditScreen::class)
    ->name('platform.homepage.testimonial.edit')
    ->breadcrumbs(fn (Trail $trail, $testimonial) => $trail
        ->parent('platform.homepage.testimonial.list')
        ->push($testimonial->name, route('platform.homepage.testimonial.edit', $testimonial)));

Route::screen('homepage/certificates', \App\Orchid\Screens\Homepage\CertificateListScreen::class)
    ->name('platform.homepage.certificate.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Certificates', route('platform.homepage.certificate.list')));

Route::screen('homepage/certificates/create', \App\Orchid\Screens\Homepage\CertificateEditScreen::class)
    ->name('platform.homepage.certificate.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.certificate.list')
        ->push('Create', route('platform.homepage.certificate.create')));

Route::screen('homepage/certificates/{certificate}/edit', \App\Orchid\Screens\Homepage\CertificateEditScreen::class)
    ->name('platform.homepage.certificate.edit')
    ->breadcrumbs(fn (Trail $trail, $certificate) => $trail
        ->parent('platform.homepage.certificate.list')
        ->push('Edit Certificate', route('platform.homepage.certificate.edit', $certificate)));

Route::screen('homepage/settings', \App\Orchid\Screens\Homepage\HomepageSettingsScreen::class)
    ->name('platform.homepage.settings')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Homepage Configuration', route('platform.homepage.settings')));

// Route::screen('idea', Idea::class, 'platform.screens.idea');

// Homepage Best Sellers
Route::screen('homepage/best-sellers', \App\Orchid\Screens\Homepage\BestSellerListScreen::class)
    ->name('platform.homepage.best_seller.list')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Best Sellers', route('platform.homepage.best_seller.list')));

Route::screen('homepage/best-sellers/create', \App\Orchid\Screens\Homepage\BestSellerEditScreen::class)
    ->name('platform.homepage.best_seller.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.homepage.best_seller.list')
        ->push('Create', route('platform.homepage.best_seller.create')));

Route::screen('homepage/best-sellers/{bestSeller}/edit', \App\Orchid\Screens\Homepage\BestSellerEditScreen::class)
    ->name('platform.homepage.best_seller.edit')
    ->breadcrumbs(fn (Trail $trail, $bestSeller) => $trail
        ->parent('platform.homepage.best_seller.list')
        ->push($bestSeller->title ?: 'Edit', route('platform.homepage.best_seller.edit', $bestSeller)));
