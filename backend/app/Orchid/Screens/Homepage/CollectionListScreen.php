<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageCollection;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class CollectionListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'collections' => HomepageCollection::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'Shop By Collection';
    }

    public function description(): ?string
    {
        return 'Manage highlighted product collections';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Collection')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.collection.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('collections', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('image', 'Preview')
                    ->width('100px')
                    ->render(fn (HomepageCollection $collection) => 
                        "<img src='{$collection->image}' alt='collection' class='mw-100 d-block img-fluid'>"),

                TD::make('title', 'Title')
                    ->render(fn (HomepageCollection $collection) => 
                        Link::make($collection->title ?? 'Untitled')
                            ->route('platform.homepage.collection.edit', $collection->id)),

                TD::make('url', 'Link URL'),

                TD::make('is_active', 'Status')
                    ->render(fn ($collection) => $collection->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageCollection $collection) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.collection.edit', $collection->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the collection is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $collection->id,
                                ]),
                        ])),
            ]),
        ];
    }

    /**
     * @param \Illuminate\Http\Request $request
     */
    public function remove(\Illuminate\Http\Request $request): void
    {
        HomepageCollection::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Collection was removed'));
    }
}
