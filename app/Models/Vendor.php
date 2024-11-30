<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $table = 'vendors';
    
    protected $fillable = [
        'business_name',
        'gst_number',
        'phone_number',
        'address',
        'gst_certificate',
        'trademark_certificate',
        'address_proof',
        'brand_name',
        'additional_info',
    ];

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
        
}
