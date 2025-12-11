<?php

declare(strict_types=1);

namespace App\Orchid;

use Orchid\Platform\Dashboard;
use Orchid\Platform\ItemPermission;
use Orchid\Platform\OrchidServiceProvider;
use Orchid\Screen\Actions\Menu;
use Orchid\Support\Color;

class PlatformProvider extends OrchidServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @param Dashboard $dashboard
     *
     * @return void
     */
    public function boot(Dashboard $dashboard): void
    {
        parent::boot($dashboard);

        // ...
    }

    /**
     * Register the application menu.
     *
     * @return Menu[]
     */
    public function menu(): array
    {
        return [
            Menu::make('Products')
                ->icon('bs.bag')
                ->route('platform.products')
                ->title('Catalog'),
            
            Menu::make('Categories')
                ->icon('bs.folder')
                ->route('platform.categories'),

            Menu::make('Stones')
                ->icon('bs.gem')
                ->route('platform.stones'),

            Menu::make(__('Users'))
                ->icon('bs.people')
                ->route('platform.systems.users')
                ->permission('platform.systems.users')
                ->title(__('Access Controls')),

            Menu::make(__('Roles'))
                ->icon('bs.shield')
                ->route('platform.systems.roles')
                ->permission('platform.systems.roles')
                ->divider(),

            Menu::make('Site Settings')
                ->icon('bs.gear')
                ->title('Configuration')
                ->list([
                    Menu::make('Header Settings')
                        ->icon('bs.menu-up')
                        ->route('platform.settings.header'),
                    
                    Menu::make('Footer Settings')
                        ->icon('bs.menu-down')
                        ->route('platform.settings.footer'),
                ]),

            Menu::make('Homepage')
                ->icon('bs.house-door')
                ->title('Content Management')
                ->list([
                    Menu::make('Hero Banner')
                        ->icon('bs.images')
                        ->route('platform.homepage.hero.list'),

                    Menu::make('Shop By Collection')
                        ->icon('bs.collection')
                        ->route('platform.homepage.collection.list'),

                    Menu::make('Gemstones')
                        ->icon('bs.gem')
                        ->route('platform.homepage.gemstone.list'),

                    Menu::make('About Us')
                        ->icon('bs.info-circle')
                        ->route('platform.homepage.about.list'),

                    Menu::make('Best Sellers')
                        ->icon('bs.star')
                        ->route('platform.homepage.best_seller.list'),

                    Menu::make('Why Choose Us')
                        ->icon('bs.check2-circle')
                        ->route('platform.homepage.feature.list'),

                    Menu::make('Testimonials')
                        ->icon('bs.chat-quote')
                        ->route('platform.homepage.testimonial.list'),

                    Menu::make('Our Certificates')
                        ->icon('bs.award')
                        ->route('platform.homepage.certificate.list'),

                    Menu::make('Configuration')
                        ->icon('bs.sliders')
                        ->route('platform.homepage.settings'),
                ]),

            
        ];
    }

    /**
     * Register permissions for the application.
     *
     * @return ItemPermission[]
     */
    public function permissions(): array
    {
        return [
            ItemPermission::group(__('System'))
                ->addPermission('platform.systems.roles', __('Roles'))
                ->addPermission('platform.systems.users', __('Users')),
        ];
    }
}
