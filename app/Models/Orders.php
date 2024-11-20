<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{   
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'order_number',
        'transacion_id',
        'status',
        'total_amount',
        'shipping_address',
        'billing_address',
        'payment_method',
        'notes',
        'order_date'
        ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function orderItems(){
        return $this->hasMany(OrderItems::class, 'order_id', 'id');
        }
    
    public function payment(){
        return $this->hasOne(Payment::class);
    }

    public function orderStatus(){
        return $this->hasOne(OrderStatus::class);
        }
    
    public function orderAddress(){
        return $this->hasOne(OrderAddress::class);
        }
    
    public function orderShipping(){
        return $this->hasOne(OrderShipping::class);
        }

    public function orderDiscount(){
        return $this->hasOne(OrderDiscount::class);
        }
    
    public function orderTax(){
        return $this->hasOne(OrderTax::class);
    }

}
