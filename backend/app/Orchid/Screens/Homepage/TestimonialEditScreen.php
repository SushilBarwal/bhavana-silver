<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageTestimonial;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class TestimonialEditScreen extends Screen
{
    public $testimonial;

    public function query(HomepageTestimonial $testimonial): iterable
    {
        return [
            'testimonial' => $testimonial,
        ] + $testimonial->toArray();
    }

    public function name(): ?string
    {
        return $this->testimonial->exists ? 'Edit Testimonial' : 'Add Testimonial';
    }

    public function commandBar(): iterable
    {
        return [
            Button::make('Save')
                ->icon('bs.check-circle')
                ->method('createOrUpdate'),

            Button::make('Remove')
                ->icon('bs.trash')
                ->method('remove')
                ->canSee($this->testimonial->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('name')
                    ->title('Customer Name')
                    ->required(),

                Input::make('country')
                    ->title('Country Name')
                    ->placeholder('e.g. United States'),

                Input::make('country_code')
                    ->title('Country Short Code')
                    ->placeholder('e.g. US')
                    ->help('Used for displaying country flags if needed'),

                TextArea::make('description')
                    ->title('Review / Description')
                    ->rows(4)
                    ->required(),

                Input::make('rating')
                    ->title('Star Rating (1-5)')
                    ->type('number')
                    ->min(1)
                    ->max(5)
                    ->value(5),

                Input::make('order')
                    ->title('Sort Order')
                    ->type('number')
                    ->value(0),

                CheckBox::make('is_active')
                    ->title('Active Status')
                    ->sendTrueOrFalse(),
            ])
        ];
    }

    public function createOrUpdate(HomepageTestimonial $testimonial, Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $testimonial->fill($request->except(['_token']))->save();
        Alert::info('Testimonial saved successfully.');
        return redirect()->route('platform.homepage.testimonial.list');
    }

    public function remove(HomepageTestimonial $testimonial)
    {
        $testimonial->delete();
        Alert::info('Testimonial deleted successfully.');
        return redirect()->route('platform.homepage.testimonial.list');
    }
}
