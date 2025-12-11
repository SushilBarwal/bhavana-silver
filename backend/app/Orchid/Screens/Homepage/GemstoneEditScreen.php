<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageGemstone;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class GemstoneEditScreen extends Screen
{
    public $gemstone;

    public function query(HomepageGemstone $gemstone): iterable
    {
        return [
            'gemstone' => $gemstone,
        ] + $gemstone->toArray();
    }

    public function name(): ?string
    {
        return $this->gemstone->exists ? 'Edit Gemstone' : 'Add Gemstone';
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
                ->canSee($this->gemstone->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Picture::make('image')
                    ->title('Gemstone Image')
                    ->targetRelativeUrl(),

                Input::make('name')
                    ->title('Name')
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

    public function createOrUpdate(HomepageGemstone $gemstone, Request $request)
    {
        $request->validate([
            'image' => 'required',
            'name' => 'required|max:255',
        ]);

        $gemstone->fill($request->except(['_token']))->save();
        Alert::info('Gemstone saved successfully.');
        return redirect()->route('platform.homepage.gemstone.list');
    }

    public function remove(HomepageGemstone $gemstone)
    {
        $gemstone->delete();
        Alert::info('Gemstone deleted successfully.');
        return redirect()->route('platform.homepage.gemstone.list');
    }
}
