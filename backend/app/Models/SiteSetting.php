<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'description',
    ];

    // Removed automatic array cast to fix Orchid form compatibility
    // JSON encoding/decoding now handled in get() and set() methods
    protected $casts = [];

    /**
     * Get a setting value by key
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }
        
        // Decode JSON if the value is a string
        if (is_string($setting->value)) {
            $decoded = json_decode($setting->value, true);
            return json_last_error() === JSON_ERROR_NONE ? $decoded : $setting->value;
        }
        
        return $setting->value;
    }

    /**
     * Set a setting value by key
     */
    public static function set(string $key, mixed $value, string $group = 'general', string $type = 'json'): self
    {
        // Encode arrays/objects to JSON for storage
        if ($type === 'json' && (is_array($value) || is_object($value))) {
            $value = json_encode($value);
        }
        
        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'group' => $group,
                'type' => $type,
            ]
        );
    }

    /**
     * Get all settings in a group
     */
    public static function getGroup(string $group): array
    {
        return static::where('group', $group)
            ->get()
            ->pluck('value', 'key')
            ->toArray();
    }

    /**
     * Scope to filter by group
     */
    public function scopeGroup($query, string $group)
    {
        return $query->where('group', $group);
    }

    /**
     * Scope to filter by key
     */
    public function scopeKey($query, string $key)
    {
        return $query->where('key', $key);
    }
}
