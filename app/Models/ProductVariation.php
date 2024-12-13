<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\AttributeValue;
use App\Models\VariationAttribute;


class ProductVariation extends BaseModel
{   
    use HasFactory;
    protected $table = 'product_variations';
    protected $primarykey = 'variation_id';
    protected $fillable = [
        'product_id',
        'sku',
        'price',
        'sale_price',
        'stock',
        'sku',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attributevalues(){
        
        return $this->belongsToMany(AttributeValue::class, 'variation_attributes', 'variation_id', 'value_id',)->withPivot('value_id');
    }


    public function variationvalues()
    {
        return $this->hasMany(VariationAttribute::class, 'variation_id', 'variation_id');
    }
}
