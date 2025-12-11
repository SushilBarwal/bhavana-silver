<?php

namespace App\Orchid\Screens\Homepage;

use App\Models\HomepageCollection;
use App\Models\HomepageSetting;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Picture;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Orchid\Support\Facades\Layout;

class HomepageSettingsScreen extends Screen
{
    /**
     * Fetch data to be displayed on the screen.
     *
     * @return array
     */
    public function query(): iterable
    {
        $settings = HomepageSetting::all()->pluck('value', 'key');

        return [
            'overview' => $settings,
        ];
    }

    /**
     * The name of the screen displayed in the header.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Homepage Configuration';
    }

    /**
     * The description is displayed on the user's screen under the heading
     */
    public function description(): ?string
    {
        return 'Configure general homepage sections';
    }

    /**
     * The screen's action buttons.
     *
     * @return \Orchid\Screen\Action[]
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Save Changes')
                ->icon('bs.check-circle')
                ->method('save'),
        ];
    }

    /**
     * The screen's layout elements.
     *
     * @return \Orchid\Screen\Layout[]|string[]
     */
    public function layout(): iterable
    {
        return [
            Layout::tabs([

                'Book Appointment' => Layout::rows([
                    Input::make('overview.appointment_title')
                        ->title('Section Title')
                        ->placeholder('Book An Appointment'),

                    Input::make('overview.appointment_subtitle')
                        ->title('Subtitle')
                        ->placeholder('Virtual or In-Store'),

                    Picture::make('overview.appointment_bg_image')
                        ->title('Background Image')
                        ->targetRelativeUrl(),

                    Input::make('overview.appointment_email')
                        ->title('Form Notification Email')
                        ->placeholder('admin@example.com')
                        ->help('Where to send appointment requests'),
                ]),
            ]),
        ];
    }

    /**
     * @param Request $request
     */
    public function save(Request $request)
    {
        $data = $request->get('overview');

        foreach ($data as $key => $value) {
            HomepageSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        Alert::info('Homepage settings saved successfully.');
    }
}
