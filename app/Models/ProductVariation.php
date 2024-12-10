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
        'price',
        'sale_price',
        'stock',
        'sku',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues() {
        return $this->belongsToMany(AttributeValue::class, 'variation_attributes', 'variation_id', 'value_id');
    }

    
    public function attribute()
        {
            return $this->belongsToMany(AttributeValue::class, 'variation_attributes', 'variation_id', 'value_id');
        }


    public function variationvalues()
    {
        return $this->hasMany(VariationAttribute::class, 'variation_id', 'variation_id',);
    }
}
