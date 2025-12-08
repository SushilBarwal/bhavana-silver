<?php

namespace App\Orchid\Screens\SiteSettings;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;

class FooterSettingsScreen extends Screen
{
    /**
     * Query data for the screen
     */
    public function query(): iterable
    {
        $footerConfig = SiteSetting::get('footer_config', [
            'columns' => [],
            'contact_info' => [
                'address' => '',
                'phone' => '',
                'email' => '',
                'hours' => '',
            ],
            'social_links' => [
                'facebook' => '',
                'instagram' => '',
                'twitter' => '',
                'pinterest' => '',
                'youtube' => '',
            ],
            'copyright' => '© 2025 Bhavana Silver Jewellers. All rights reserved.',
            'payment_methods' => [],
            'newsletter' => [
                'title' => 'Subscribe to our Newsletter',
                'description' => 'Get updates on new products and special offers',
            ],
        ]);

        // Fix payment_methods for Upload field compatibility
        // Upload field expects attachment IDs (integers), not strings
        if (isset($footerConfig['payment_methods']) && is_array($footerConfig['payment_methods'])) {
            $footerConfig['payment_methods'] = array_filter($footerConfig['payment_methods'], function($value) {
                return is_numeric($value);
            });
        }

        // Convert links array to pipe-separated format for display
        if (isset($footerConfig['columns']) && is_array($footerConfig['columns'])) {
            foreach ($footerConfig['columns'] as &$column) {
                if (isset($column['links']) && is_array($column['links'])) {
                    $lines = [];
                    foreach ($column['links'] as $link) {
                        if (isset($link['label']) && isset($link['url'])) {
                            $lines[] = $link['label'] . ' | ' . $link['url'];
                        }
                    }
                    $column['links'] = implode("\n", $lines);
                }
            }
        }

        return [
            'footer' => $footerConfig,
        ];
    }

    /**
     * Screen name
     */
    public function name(): ?string
    {
        return 'Footer Settings';
    }

    /**
     * Screen description
     */
    public function description(): ?string
    {
        return 'Manage website footer, contact information, links, and social media';
    }

    /**
     * Command bar buttons
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Save Settings')
                ->icon('bs.save')
                ->method('save')
                ->type(\Orchid\Support\Color::SUCCESS),
        ];
    }

    /**
     * Screen layout
     */
    public function layout(): iterable
    {
        return [
            Layout::tabs([
                'Footer Columns' => [
                    Layout::rows([
                        Matrix::make('footer.columns')
                            ->title('Footer Link Columns')
                            ->columns([
                                'Column Title' => 'title',
                                'Order' => 'order',
                            ])
                            ->fields([
                                'title' => Input::make()
                                    ->title('Column Title')
                                    ->placeholder('e.g., Quick Links, Customer Service, Shop')
                                    ->help('The heading for this footer column'),
                                    
                                'links' => TextArea::make()
                                    ->title('Links')
                                    ->rows(6)
                                    ->placeholder('About Us | /about\nContact | /contact\nFAQ | /faq\nShipping | /shipping')
                                    ->help('Add links for this column. Format: Label | URL (one per line)'),
                                    
                                'order' => Input::make()
                                    ->title('Display Order')
                                    ->type('number')
                                    ->value(0)
                                    ->help('Lower numbers appear first'),
                            ])
                            ->help('Create footer columns with links. Each column will display as a separate section in the footer.'),
                    ]),
                ],

                'Contact Information' => [
                    Layout::rows([
                        TextArea::make('footer.contact_info.address')
                            ->title('Business Address')
                            ->rows(3)
                            ->placeholder('123 Jewellery Street, City, State, ZIP')
                            ->help('Your business address displayed in footer'),

                        Input::make('footer.contact_info.phone')
                            ->title('Phone Number')
                            ->placeholder('+1 (234) 567-8900')
                            ->help('Contact phone number'),

                        Input::make('footer.contact_info.email')
                            ->title('Email Address')
                            ->type('email')
                            ->placeholder('info@bhavanasilver.com')
                            ->help('Contact email address'),

                        Input::make('footer.contact_info.hours')
                            ->title('Business Hours')
                            ->placeholder('Mon-Sat: 9AM-6PM, Sun: Closed')
                            ->help('Operating hours'),
                    ]),
                ],

                'Social Media' => [
                    Layout::rows([
                        Input::make('footer.social_links.facebook')
                            ->title('Facebook URL')
                            ->placeholder('https://facebook.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('footer.social_links.instagram')
                            ->title('Instagram URL')
                            ->placeholder('https://instagram.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('footer.social_links.twitter')
                            ->title('Twitter URL')
                            ->placeholder('https://twitter.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('footer.social_links.pinterest')
                            ->title('Pinterest URL')
                            ->placeholder('https://pinterest.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('footer.social_links.youtube')
                            ->title('YouTube URL')
                            ->placeholder('https://youtube.com/@bhavanasilver')
                            ->help('Leave empty to hide'),
                    ]),
                ],

                'Copyright & Newsletter' => [
                    Layout::rows([
                        TextArea::make('footer.copyright')
                            ->title('Copyright Text')
                            ->rows(2)
                            ->placeholder('© 2025 Bhavana Silver Jewellers. All rights reserved.')
                            ->help('Copyright notice displayed at bottom of footer'),

                        Input::make('footer.newsletter.title')
                            ->title('Newsletter Section Title')
                            ->placeholder('Subscribe to our Newsletter')
                            ->help('Title for newsletter signup section'),

                        TextArea::make('footer.newsletter.description')
                            ->title('Newsletter Description')
                            ->rows(2)
                            ->placeholder('Get updates on new products and special offers')
                            ->help('Description text for newsletter section'),
                    ]),
                ],

                'Payment Methods' => [
                    Layout::rows([
                        Upload::make('footer.payment_methods')
                            ->title('Payment Method Icons')
                            ->acceptedFiles('.png,.jpg,.jpeg,.svg')
                            ->maxFileSize(1)
                            ->multiple()
                            ->help('Upload payment method logos (Visa, Mastercard, PayPal, etc.)'),
                    ]),
                ],
            ]),
        ];
    }

    /**
     * Save footer settings
     */
    public function save(Request $request): void
    {
        $footerData = $request->input('footer');

        // Process footer columns
        if (isset($footerData['columns']) && is_array($footerData['columns'])) {
            // Filter out empty rows
            $footerData['columns'] = array_filter($footerData['columns'], function ($column) {
                return !empty($column['title']);
            });

            // Process each column's links from pipe-separated format
            foreach ($footerData['columns'] as &$column) {
                if (isset($column['links']) && is_string($column['links'])) {
                    // Parse pipe-separated format: "Label | URL"
                    $lines = explode("\n", $column['links']);
                    $linksArray = [];
                    
                    foreach ($lines as $line) {
                        $line = trim($line);
                        if (empty($line)) continue;
                        
                        // Split by pipe
                        $parts = explode('|', $line, 2);
                        if (count($parts) === 2) {
                            $linksArray[] = [
                                'label' => trim($parts[0]),
                                'url' => trim($parts[1]),
                            ];
                        }
                    }
                    
                    $column['links'] = $linksArray;
                }
            }

            // Sort by order
            usort($footerData['columns'], function ($a, $b) {
                $orderA = isset($a['order']) ? (int)$a['order'] : 0;
                $orderB = isset($b['order']) ? (int)$b['order'] : 0;
                return $orderA - $orderB;
            });

            // Re-index array
            $footerData['columns'] = array_values($footerData['columns']);
        }

        // Handle payment method images
        if (isset($footerData['payment_methods']) && is_array($footerData['payment_methods'])) {
            $validAttachmentIds = array_filter($footerData['payment_methods'], function($id) {
                return is_numeric($id) && $id > 0;
            });
            
            if (!empty($validAttachmentIds)) {
                $paymentPaths = [];
                foreach ($validAttachmentIds as $attachmentId) {
                    $attachment = \Orchid\Attachment\Models\Attachment::find($attachmentId);
                    if ($attachment) {
                        $relativePath = ltrim($attachment->path . $attachment->name . '.' . $attachment->extension, '/');
                        $paymentPaths[] = '/storage/' . $relativePath;
                    }
                }
                $footerData['payment_methods'] = $paymentPaths;
            }
        }

        // Save to database
        SiteSetting::set('footer_config', $footerData, 'footer', 'json');

        Alert::success('Footer settings saved successfully!');
    }
}
