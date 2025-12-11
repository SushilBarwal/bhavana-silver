<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageFeature;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class FeatureListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'features' => HomepageFeature::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'Why Choose Us';
    }

    public function description(): ?string
    {
        return 'Manage features section items';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Feature')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.feature.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('features', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('heading', 'Heading')
                    ->render(fn (HomepageFeature $feature) => 
                        Link::make($feature->heading ?? 'Untitled')
                            ->route('platform.homepage.feature.edit', $feature->id)),

                TD::make('icon', 'Icon')
                    ->render(fn ($feature) => 
                        str_starts_with($feature->icon, 'http') || str_starts_with($feature->icon, '/')
                            ? "<img src='{$feature->icon}' style='width: 30px; height: 30px;' alt='icon'>" 
                            : "<i class='{$feature->icon}'></i> {$feature->icon}"),

                TD::make('description', 'Description')
                     ->render(fn ($feature) => \Illuminate\Support\Str::limit($feature->description, 50)),

                TD::make('is_active', 'Status')
                    ->render(fn ($feature) => $feature->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageFeature $feature) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.feature.edit', $feature->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the feature is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $feature->id,
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
        HomepageFeature::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Feature was removed'));
    }
}
