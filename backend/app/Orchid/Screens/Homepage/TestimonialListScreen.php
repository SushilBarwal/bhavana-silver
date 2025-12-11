<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageTestimonial;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class TestimonialListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'testimonials' => HomepageTestimonial::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'Testimonials';
    }

    public function description(): ?string
    {
        return 'Manage customer testimonials';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Testimonial')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.testimonial.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('testimonials', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('name', 'Customer Name')
                    ->render(fn (HomepageTestimonial $testimonial) => 
                        Link::make($testimonial->name ?? 'Untitled')
                            ->route('platform.homepage.testimonial.edit', $testimonial->id)),

                TD::make('country', 'Country'),

                TD::make('rating', 'Rating')
                    ->render(fn ($testimonial) => str_repeat('★', $testimonial->rating)),

                TD::make('is_active', 'Status')
                    ->render(fn ($testimonial) => $testimonial->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageTestimonial $testimonial) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.testimonial.edit', $testimonial->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the testimonial is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $testimonial->id,
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
        HomepageTestimonial::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Testimonial was removed'));
    }
}
