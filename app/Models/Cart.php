<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'cart';
    protected $fillable = ['user_id', 'cartId','name', 'price','attribute_name', 'attribute_value ','image', 'quantity'];
}
