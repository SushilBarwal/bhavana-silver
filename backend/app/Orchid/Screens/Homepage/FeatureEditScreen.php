<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageFeature;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class FeatureEditScreen extends Screen
{
    public $feature;

    public function query(HomepageFeature $feature): iterable
    {
        return [
            'feature' => $feature,
        ] + $feature->toArray();
    }

    public function name(): ?string
    {
        return $this->feature->exists ? 'Edit Feature' : 'Add Feature';
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
                ->canSee($this->feature->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('heading')
                    ->title('Heading')
                    ->required(),

                TextArea::make('description')
                    ->title('Description')
                    ->rows(3)
                    ->required(),
                
                Input::make('icon')
                    ->title('Icon (Class Name or Image URL)')
                    ->popover('Enter a FontAwesome class (e.g., fa-shipping-fast) OR upload an image below.')
                    ->placeholder('fa-solid fa-star'),

                Picture::make('icon_image')
                   ->title('Or Upload Icon Image')
                   ->targetRelativeUrl(),

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

    public function createOrUpdate(HomepageFeature $feature, Request $request)
    {
        $request->validate([
            'heading' => 'required|max:255',
            'description' => 'required',
        ]);

        $data = $request->except(['_token']);
        
        // Use uploaded image if provided, otherwise use text input
        if ($request->filled('icon_image')) {
            $data['icon'] = $request->input('icon_image');
        }
        // Remove virtual field
        unset($data['icon_image']);
        
        $feature->fill($data)->save();
        
        Alert::info('Feature saved successfully.');
        return redirect()->route('platform.homepage.feature.list');
    }

    public function remove(HomepageFeature $feature)
    {
        $feature->delete();
        Alert::info('Feature deleted successfully.');
        return redirect()->route('platform.homepage.feature.list');
    }
}
