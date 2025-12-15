<?php

namespace App\Orchid\Screens\Wishlist;

use App\Models\Wishlist;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Actions\Button;
use Orchid\Support\Facades\Toast;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WishlistListScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
            'wishlists' => Wishlist::with(['user', 'product'])->paginate(),
        ];
    }

    /**
     * The name of the screen displayed in the header.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Customer Wishlists';
    }

    /**
     * The description is displayed on the user's screen under the heading
     */
    public function description(): ?string
    {
        return 'All products added to wishlist by customers';
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]|string[]
     */
    public function layout(): iterable
    {
        return [
            Layout::table('wishlists', [
                TD::make('user_id', 'User')
                    ->render(fn (Wishlist $wishlist) => $wishlist->user->name ?? 'Unknown'),

                TD::make('product_id', 'Product')
                    ->render(fn (Wishlist $wishlist) => $wishlist->product->name ?? 'Unknown'),
                
                TD::make('product_image', 'Image')
                    ->render(function (Wishlist $wishlist) {
                        $imagePath = $wishlist->product->image;
                        if ($imagePath) {
                            $imageUrl = Storage::disk('public')->url($imagePath);
                            return "<img src='{$imageUrl}' alt='Product' style='width: 50px; height: 50px; object-fit: cover; border-radius: 4px;' />";
                        }
                        return '<span style="color: #999;">No image</span>';
                    }),

                TD::make('created_at', 'Added Date')
                    ->render(fn (Wishlist $wishlist) => $wishlist->created_at->toDateTimeString()),

                TD::make('Actions')
                    ->align(TD::ALIGN_CENTER)
                    ->width('100px')
                    ->render(fn (Wishlist $wishlist) => Button::make('Remove')
                        ->icon('bs.trash3')
                        ->confirm('Are you sure you want to remove this item?')
                        ->method('remove', [
                            'id' => $wishlist->id,
                        ])),
            ]),
        ];
    }

    /**
     * @param Request $request
     */
    public function remove(Request $request): void
    {
        Wishlist::findOrFail($request->get('id'))->delete();
    
        Toast::info('Wishlist item removed');
    }
}
