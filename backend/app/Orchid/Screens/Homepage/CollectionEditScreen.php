<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageCollection;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class CollectionEditScreen extends Screen
{
    public $collection;

    public function query(HomepageCollection $collection): iterable
    {
        return [
            'collection' => $collection,
        ] + $collection->toArray();
    }

    public function name(): ?string
    {
        return $this->collection->exists ? 'Edit Collection' : 'Create Collection';
    }

    public function commandBar(): iterable
    {
        return [
            Button::make('Create')
                ->icon('bs.check-circle')
                ->method('createOrUpdate')
                ->canSee(!$this->collection->exists),

            Button::make('Update')
                ->icon('bs.check-circle')
                ->method('createOrUpdate')
                ->canSee($this->collection->exists),

            Button::make('Remove')
                ->icon('bs.trash')
                ->method('remove')
                ->canSee($this->collection->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Picture::make('image')
                    ->title('Collection Image')
                    ->targetRelativeUrl(),

                Input::make('title')
                    ->title('Title')
                    ->required(),

                TextArea::make('description')
                    ->title('Description')
                    ->rows(3),

                Input::make('url')
                    ->title('Link URL')
                    ->placeholder('/collections/silver-rings'),

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

    public function createOrUpdate(HomepageCollection $collection, Request $request)
    {
        $request->validate([
            'image' => 'required',
            'title' => 'required|max:255',
        ]);

        $collection->fill($request->except(['_token']))->save();
        Alert::info('Collection saved successfully.');
        return redirect()->route('platform.homepage.collection.list');
    }

    public function remove(HomepageCollection $collection)
    {
        $collection->delete();
        Alert::info('Collection deleted successfully.');
        return redirect()->route('platform.homepage.collection.list');
    }
}
