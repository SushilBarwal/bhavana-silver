<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageBestSeller;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class BestSellerListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'best_sellers' => HomepageBestSeller::orderBy('order')->paginate(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Best Sellers Management';
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Create Best Seller Section')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.best_seller.create'),
        ];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]|string[]
     */
    public function layout(): iterable
    {
        return [
            Layout::table('best_sellers', [
                TD::make('order', 'Sort Order')
                    ->sort()
                    ->width('100px'),

                TD::make('title', 'Title')
                    ->sort()
                    ->render(fn (HomepageBestSeller $item) => Link::make($item->title ?: 'Untitled')
                        ->route('platform.homepage.best_seller.edit', $item->id)),

                TD::make('category_ids', 'Categories')
                    ->render(fn (HomepageBestSeller $item) => count($item->category_ids ?? []) . ' Categories Selected'),

                TD::make('is_active', 'Active')
                    ->sort()
                    ->render(fn (HomepageBestSeller $item) => $item->is_active ? 'Yes' : 'No'),

                TD::make('updated_at', 'Last Updated')
                    ->sort()
                    ->render(fn (HomepageBestSeller $item) => $item->updated_at->toDateTimeString()),
            ]),
        ];
    }
}
