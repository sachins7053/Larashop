<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\ProductCat;

class ProductCatLinking extends Model
{
    public $timestamps = false;
    protected $table = 'cat_product';
    protected $fillable = [
        'category_id',
        'product_id'
       
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function Category()
    {
        return $this->belongsTo(ProductCat::class);
    }
}
