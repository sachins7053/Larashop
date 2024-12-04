<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderVendorStatus extends Model
{
    use HasFactory;

    // Define the table name (if it's not plural of the model name)
    protected $table = 'order_vendor_statuses';

    // Fillable properties to allow mass assignment
    protected $fillable = [
        'order_id',
        'vendor_id',
        'status',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id', 'id');
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class, 'vendor_id' ,'id'); 
    }
}
