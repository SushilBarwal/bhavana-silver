<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageBestSeller;
use App\Models\Category;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class BestSellerEditScreen extends Screen
{
    public $bestSeller;

    public function query(HomepageBestSeller $bestSeller): iterable
    {
        return [
            'bestSeller' => $bestSeller,
        ];
    }

    public function name(): ?string
    {
        return $this->bestSeller->exists ? 'Edit Best Seller Section' : 'Create Best Seller Section';
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
                ->canSee($this->bestSeller->exists),
        ];
    }

    public function layout(): iterable
    {
        $fields = [
            Input::make('bestSeller.title')
                ->title('Section Title')
                ->placeholder('e.g. Best Sellers or Weekly Picks')
                ->required(),

            Select::make('bestSeller.category_ids')
                ->title('Select Categories')
                ->fromModel(Category::class, 'name')
                ->multiple()
                ->help('Select multiple categories to display as tabs. SAVE to see product selectors for these categories.'),

            Input::make('bestSeller.order')
                ->title('Sort Order')
                ->type('number')
                ->value(0),

            CheckBox::make('bestSeller.is_active')
                ->title('Active Status')
                ->sendTrueOrFalse(),
        ];

        // If categories are selected, show product pickers for each
        if ($this->bestSeller->exists && !empty($this->bestSeller->category_ids)) {
             $fields[] = \Orchid\Screen\Fields\Label::make('products_label')
                ->title('Product Selection')
                ->value('Select products for each category below (Overrides automatic selection if used):')
                ->hr();

             foreach ($this->bestSeller->category_ids as $categoryId) {
                 $category = Category::find($categoryId);
                 if ($category) {
                     $fields[] = \Orchid\Screen\Fields\Relation::make("bestSeller.product_selections.$categoryId")
                        ->title("Products for: " . $category->name)
                        ->fromModel(\App\Models\Product::class, 'name')
                        ->applyScope('byCategory', $categoryId)
                        ->multiple()
                        ->help("Select which products to display for " . $category->name);
                 }
             }
        }

        return [
            Layout::rows($fields)
        ];
    }

    public function createOrUpdate(HomepageBestSeller $bestSeller, Request $request)
    {
        $request->validate([
            'bestSeller.title' => 'required|max:255',
            'bestSeller.category_ids' => 'required|array',
        ]);

        $data = $request->get('bestSeller');
        
        // Ensure product_selections is an array (Orchid might send nulls for empty selections)
        $productSelections = $data['product_selections'] ?? [];
        // Clean up: keys are category IDs, values are arrays of product IDs
        $data['product_selections'] = $productSelections;

        $bestSeller->fill($data)->save();
        
        Alert::info('Best Seller section saved successfully.');
        // Stay on page to allow Product selection
        return redirect()->route('platform.homepage.best_seller.edit', $bestSeller->id);
    }

    public function remove(HomepageBestSeller $bestSeller)
    {
        $bestSeller->delete();
        Alert::info('Best Seller section deleted successfully.');
        return redirect()->route('platform.homepage.best_seller.list');
    }
}
