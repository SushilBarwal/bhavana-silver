<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageHeroSlide;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;
use Orchid\Support\Facades\Toast;

class HeroSlideEditScreen extends Screen
{
    /**
     * @var HomepageHeroSlide
     */
    public $slide;

    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(HomepageHeroSlide $slide): iterable
    {
        return [
            'slide' => $slide,
        ] + $slide->toArray();
    }

    /**
     * The name of the screen displayed in the header.
     */
    public function name(): ?string
    {
        return $this->slide->exists ? 'Edit Slide' : 'Create Slide';
    }

    /**
     * The screen's action buttons.
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Create slide')
                ->icon('bs.check-circle')
                ->method('createOrUpdate')
                ->canSee(!$this->slide->exists),

            Button::make('Update')
                ->icon('bs.check-circle')
                ->method('createOrUpdate')
                ->canSee($this->slide->exists),

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
                    ->placeholder('Enter slide title'),

                TextArea::make('description')
                    ->title('Description')
                    ->rows(3),

                Input::make('button_text')
                    ->title('Button Text')
                    ->placeholder('e.g. Shop Now'),

                Input::make('button_link')
                    ->title('Button Link')
                    ->placeholder('e.g. /products'),

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

    public function createOrUpdate(HomepageHeroSlide $slide, Request $request)
    {
        $request->validate([
            'image' => 'required',
            'title' => 'required|max:255',
            'button_text' => 'nullable|max:50',
            'button_link' => 'nullable|max:255',
        ]);

        $slide->fill($request->except(['_token']))->save();

        Alert::info('You have successfully created a hero slide.');

        return redirect()->route('platform.homepage.hero.list');
    }

    /**
     * @param HomepageHeroSlide $slide
     *
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Exception
     */
    public function remove(HomepageHeroSlide $slide)
    {
        $slide->delete();

        Alert::info('You have successfully deleted the hero slide.');

        return redirect()->route('platform.homepage.hero.list');
    }
}
