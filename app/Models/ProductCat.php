<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCat extends Model
{   
    use HasFactory;
    protected $table = 'product_categories';

    // Fillable properties
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'description',
        'status',
        'order',
        'image',
        'is_featured',
        'icon',
        'icon_image',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cat_product', 'category_id', 'product_id');
    }
}
