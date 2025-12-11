<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageCertificate;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class CertificateEditScreen extends Screen
{
    public $certificate;

    public function query(HomepageCertificate $certificate): iterable
    {
        return [
            'certificate' => $certificate,
        ] + $certificate->toArray();
    }

    public function name(): ?string
    {
        return $this->certificate->exists ? 'Edit Certificate' : 'Add Certificate';
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
                ->canSee($this->certificate->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Picture::make('image')
                    ->title('Certificate Image')
                    ->targetRelativeUrl()
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

    public function createOrUpdate(HomepageCertificate $certificate, Request $request)
    {
        $request->validate([
            'image' => 'required',
        ]);

        $certificate->fill($request->except(['_token']))->save();
        Alert::info('Certificate saved successfully.');
        return redirect()->route('platform.homepage.certificate.list');
    }

    public function remove(HomepageCertificate $certificate)
    {
        $certificate->delete();
        Alert::info('Certificate deleted successfully.');
        return redirect()->route('platform.homepage.certificate.list');
    }
}
