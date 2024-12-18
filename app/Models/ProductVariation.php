<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\AttributeValue;
use App\Models\VariationAttribute;


class ProductVariation extends BaseModel
{   
    protected $table = 'product_variations';
    protected $primarykey = 'variation_id';
    protected $fillable = [
        'product_id',
        'attributes',
        'price',
        'sale_price',
        'stock',
        'attribute_id',
        'attribute_value'
    ];

    protected $casts = [
        'attributes' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function variationAttribute()
    {
        return $this->hasMany(VariationAttribute::class);
    }
    
    public function variationvalues()
    {
        return $this->belongsToMany(VariationAttribute::class, 'attribute_values', 'value_id','attribute_id');
    }
}
