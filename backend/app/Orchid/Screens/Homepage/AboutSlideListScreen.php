<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageAboutSlide;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class AboutSlideListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'about_slides' => HomepageAboutSlide::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'About Us Section';
    }

    public function description(): ?string
    {
        return 'Manage slides for the About Us carousel';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Slide')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.about.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('about_slides', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('title', 'Title')
                    ->render(fn (HomepageAboutSlide $slide) => 
                        Link::make($slide->title ?? 'Untitled')
                            ->route('platform.homepage.about.edit', $slide->id)),

                TD::make('subtitle', 'Subtitle'),

                TD::make('description', 'Description')
                    ->width('300px')
                    ->render(fn ($slide) => \Illuminate\Support\Str::limit($slide->description, 50)),

                TD::make('is_active', 'Status')
                    ->render(fn ($slide) => $slide->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageAboutSlide $slide) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.about.edit', $slide->id)
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
        HomepageAboutSlide::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Slide was removed'));
    }
}
