<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageCertificate;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;

class CertificateListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'certificates' => HomepageCertificate::orderBy('order')->paginate(),
        ];
    }

    public function name(): ?string
    {
        return 'Our Certificates';
    }

    public function description(): ?string
    {
        return 'Manage certificate images';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Add Certificate')
                ->icon('bs.plus-circle')
                ->route('platform.homepage.certificate.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('certificates', [
                TD::make('order', 'Order')->sort()->width('100px'),
                
                TD::make('image', 'Certificate Image')
                    ->width('150px')
                    ->render(fn (HomepageCertificate $cert) => 
                        Link::make('')
                             ->route('platform.homepage.certificate.edit', $cert->id)
                             ->icon('bs.pencil')
                             ->title('Edit')
                         . "<img src='{$cert->image}' alt='cert' class='mw-100 d-block mt-2' style='max-height: 100px;'>"),

                TD::make('is_active', 'Status')
                    ->render(fn ($cert) => $cert->is_active ? 
                        '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'),

                TD::make(__('Actions'))
                    ->align(TD::ALIGN_RIGHT)
                    ->width('100px')
                    ->render(fn (HomepageCertificate $cert) => \Orchid\Screen\Actions\DropDown::make()
                        ->icon('bs.three-dots-vertical')
                        ->list([
                            Link::make(__('Edit'))
                                ->route('platform.homepage.certificate.edit', $cert->id)
                                ->icon('bs.pencil'),

                            \Orchid\Screen\Actions\Button::make(__('Delete'))
                                ->icon('bs.trash')
                                ->confirm(__('Once the certificate is deleted, all of its resources and data will be permanently deleted.'))
                                ->method('remove', [
                                    'id' => $cert->id,
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
        HomepageCertificate::findOrFail($request->get('id'))->delete();

        \Orchid\Support\Facades\Toast::info(__('Certificate was removed'));
    }
}
