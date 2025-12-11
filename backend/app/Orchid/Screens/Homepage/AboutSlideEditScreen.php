<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageAboutSlide;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class AboutSlideEditScreen extends Screen
{
    public $slide;

    public function query(HomepageAboutSlide $slide): iterable
    {
        return [
            'slide' => $slide,
        ] + $slide->toArray();
    }

    public function name(): ?string
    {
        return $this->slide->exists ? 'Edit About Slide' : 'Add About Slide';
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
                ->canSee($this->slide->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Picture::make('image')
                    ->title('Slide Image')
                    ->targetRelativeUrl(),

                Input::make('title')
                    ->title('Title')
                    ->required(),

                Input::make('subtitle')
                    ->title('Subtitle'),

                TextArea::make('description')
                    ->title('Description')
                    ->rows(5)
                    ->required(),

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

    public function createOrUpdate(HomepageAboutSlide $slide, Request $request)
    {
        $request->validate([
            'title' => 'nullable|max:255',
            'image' => 'nullable',
            'description' => 'required',
        ]);

        $slide->fill($request->except(['_token']))->save();
        Alert::info('About slide saved successfully.');
        return redirect()->route('platform.homepage.about.list');
    }

    public function remove(HomepageAboutSlide $slide)
    {
        $slide->delete();
        Alert::info('About slide deleted successfully.');
        return redirect()->route('platform.homepage.about.list');
    }
}
