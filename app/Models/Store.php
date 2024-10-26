<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table ='stores';
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'country',
        'state',
        'city',
        'customer_id',
        'logo',
        'logo_square',
        'cover_image',
        'description',
        'content',
        'status',
        'vendor_verified_at',
        'zip_code',
        'company',
        'tax_id',
        'certificate_file',
        'government_id_file',
    ];
}
