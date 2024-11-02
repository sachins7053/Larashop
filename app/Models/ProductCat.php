<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCat extends Model
{
    protected $table = 'product_categories';

    // Fillable properties
    protected $fillable = [
        'name',
        'parent_id',
        'description',
        'status',
        'order',
        'image',
        'is_featured',
        'icon',
        'icon_image',
    ];
}
