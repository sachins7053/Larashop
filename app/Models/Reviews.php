<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;

    protected $casts = [
        'images' => 'array',
    ];
    
    protected $title = 'reviews';
    
    protected $fillable = [
        'product_id',
        'user_id',
        'review_title',
        'rating',
        'review',
        'images',
        'status',
    ];

    public function products(){

        return $this->belongsTo(Product::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
