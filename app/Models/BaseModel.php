<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class BaseModel extends Model
{
    protected static function generateUniqueSlug($name, $column = 'slug')
    {
        // Convert name to slug
        $slug = Str::slug($name);
        
        // Check if slug already exists
        $originalSlug = $slug;
        $count = 1;

        // Check for existing slugs in the same model
        while (static::where($column, $slug)->exists()) {
            // If slug exists, append a number
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
}
