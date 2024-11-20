<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'variation_id',
        'subtotal',
    ];

    public function order(){
        return $this->belongsTo(Orders::class, 'order_id', 'id');
    }

    public function product(){
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

}
