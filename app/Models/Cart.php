<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = "carts";
    protected $fillable = [
        'user_id',
        'cartId',
        'productId',
        'name',
        'price',
        'quantity',
        'image',
        'attributes',
        'attribute_name',
        'attribute_value',
    ];

    protected $casts = [
        'attributes' => 'array', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
