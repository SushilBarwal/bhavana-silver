<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageGemstone;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class GemstoneListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'gemstones' => HomepageGemstone::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'Gemstones';
    }

    public function description(): ?string
    {
        return 'Manage featured gemstones grid';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Gemstone')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.gemstone.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('gemstones', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('image', 'Preview')
                    ->width('80px')
                    ->render(fn (HomepageGemstone $gemstone) => 
                        "<img src='{$gemstone->image}' alt='gem' class='mw-100 d-block img-fluid rounded-circle' style='width: 50px; height: 50px; object-fit: cover;'>"),

                TD::make('name', 'Name')
                    ->render(fn (HomepageGemstone $gemstone) => 
                        Link::make($gemstone->name ?? 'Untitled')
                            ->route('platform.homepage.gemstone.edit', $gemstone->id)),

                TD::make('is_active', 'Status')
                    ->render(fn ($gemstone) => $gemstone->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageGemstone $gemstone) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.gemstone.edit', $gemstone->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the gemstone is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $gemstone->id,
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
        HomepageGemstone::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Gemstone was removed'));
    }
}
