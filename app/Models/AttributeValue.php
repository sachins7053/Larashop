<?php

namespace App\Models;
use App\Models\ProductAttribute;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{   
    protected $table =  ['attribute_values'];
    protected $fillable = ['attribute_id', 'value'];

    public function attribute()
    {
        return $this->belongsTo(ProductAttribute::class);
    }
}