<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
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
}
