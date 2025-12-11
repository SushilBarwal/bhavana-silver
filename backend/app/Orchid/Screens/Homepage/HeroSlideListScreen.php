<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageHeroSlide;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class HeroSlideListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'hero_slides' => HomepageHeroSlide::orderBy('order')->paginate(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Hero Slides';
    }

    /**
     * The description is displayed on the user's screen under the heading
     */
    public function description(): ?string
    {
        return 'Manage homepage carousel slides';
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Add Slide')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.hero.create'),
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
            Layout::table('hero_slides', [
                TD::make('order', 'Order')
                    ->sort()
                    ->width('100px'),
                
                TD::make('image', 'Preview')
                    ->width('150px')
                    ->render(fn (HomepageHeroSlide $slide) => 
                        "<img src='{$slide->image}' alt='slide' class='mw-100 d-block img-fluid'>"),

                TD::make('title', 'Title')
                    ->render(fn (HomepageHeroSlide $slide) => 
                        Link::make($slide->title ?? 'Untitled')
                            ->route('platform.homepage.hero.edit', $slide->id)),

                TD::make('is_active', 'Status')
                    ->render(fn (HomepageHeroSlide $slide) => 
                        $slide->is_active ? '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make('created_at', 'Created'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageHeroSlide $slide) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.hero.edit', $slide->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the slide is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $slide->id,
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
        HomepageHeroSlide::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Slide was removed'));
    }
}
