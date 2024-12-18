<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductVariation;

class Product extends BaseModel
{
    use HasFactory;

    protected $casts = [
        'images' => 'array',
    ];

    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'status',
        'images',
        'video_media',
        'sku',
        'order',
        'quantity',
        'allow_checkout_when_out_of_stock',
        'with_storehouse_management',
        'is_featured',
        'brand_id',
        'is_variation',
        'sale_type',
        'price',
        'sale_price',
        'start_date',
        'end_date',
        'length',
        'wide',
        'height',
        'weight',
        'tax_id',
        'views',
        'stock_status',
        'created_by_id',
        'created_by_type',
        'image',
        'product_type',
        'barcode',
        'cost_per_item',
        'generate_license_code',
        'minimum_order_quantity',
        'maximum_order_quantity',
        'notify_attachment_updated',
        'specification_table_id',
        'store_id',
        'approved_by'
    ];

    public function variations()
    {
        return $this->hasMany(ProductVariation::class,  'product_id');
    }

    public function categories()
    {
        return $this->belongsToMany(ProductCat::class, 'cat_product', 'category_id', 'product_id');
    }


    public function orderitems(){
        return $this->belongsTo(OrderItem::class, 'product_id', 'id');
    }

    public static function getFillableAttributes()
    {
        return (new static)->getFillable();
    }

   
}
