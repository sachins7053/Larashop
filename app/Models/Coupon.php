<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'coupon_code',
        'coupon_type',
        'discount_amount',
        'percentage_discount',
        'start_date',
        'end_date',
        'description',
        'user_id',
        'usage_limit',
        'usage_count',
        'payment_methods',
        'is_new_user',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'payment_methods' => 'array',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'coupon_category');
    }

    public function canBeUsedByUser($user)
    {
        if ($this->is_new_user && $user->orders->count() > 0) {
            return false; 
        }
        return true;
    }

    public function isValidPaymentMethod($paymentMethod)
    {
        if ($this->payment_methods && !in_array($paymentMethod, $this->payment_methods)) {
            return false; 
        }
        return true;
    }

    public function canBeUsedForProduct($product)
    {
        if ($this->categories->isEmpty()) {
            return true; 
        }

        foreach ($this->categories as $category) {
            if ($category->id == $product->category_id) {
                return true; 
            }
        }

        return false; 
    }

    public function applyDiscount($totalAmount)
    {
        if ($this->coupon_type == 'Percentage' && $this->percentage_discount) {
            return $totalAmount - ($totalAmount * ($this->percentage_discount / 100));
        }

        if ($this->coupon_type == 'Discount' && $this->discount_amount) {
            return $totalAmount - $this->discount_amount;
        }

        return $totalAmount; 
    }

}
