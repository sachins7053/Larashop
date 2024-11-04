<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\attributeValue;


class ProductVariation extends Model
{   
    protected $table = 'product_variations';

    protected $fillable = [
        'product_id',
        'attributes',
        'price',
        'sale_price',
        'stock'
    ];

    protected $casts = [
        'attributes' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'variation_attributes', 'variation_id', 'attribute_value_id');
    }
}
