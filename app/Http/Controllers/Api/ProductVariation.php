<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductVariations;
use App\Models\attributeValues;
use App\Models\Product;

class ProductVariation extends Controller
{
    public function index(){

    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'variation_attributes', 'variation_id', 'attribute_value_id');
    }

    public function create(Request $request){
        $ProductVariation = create([
            'product_id' =>  '$product->id',
            'attributes' => $variation['attributes'],
            'mrp_price' => $variation['mrpPrice'],
            'sale_price' => $variation['salePrice'],
            'stock' => $variation['stock']
        ]);
    }
}
