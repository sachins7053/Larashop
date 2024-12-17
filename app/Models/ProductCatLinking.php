<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ProductCatLinking extends Model
{   
    public $timestamps = false;
    protected $table = 'cat_product';
    protected $fillable = [
        'category_id',
        'product_id'
       
    ];

    public function cat(){
        return $this->hasOne(ProductCat::class, 'category_id', 'id');
    }
    public function products(){
        return $this->hasOne(Product::class, 'product_id', 'id');
    }

  
}
