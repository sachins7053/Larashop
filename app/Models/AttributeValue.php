<?php

namespace App\Models;
use App\Models\ProductAttribute;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{   
    protected $table =  'attribute_values';
    protected $primaryKey = 'value_id';
    protected $fillable = ['attribute_id', 'value_id', 'value'];

    public function attribute()
    {
        //return $this->belongsTo(ProductVariation::class);
        return $this->belongsToMany( ProductVariation::class,
        'variation_attributes',
        'variation_id',         // Foreign key on the pivot table for ProductVariation
        'value_id',              // Foreign key on the pivot table for AttributeValue
        'id',                    // Local key on ProductVariation
        'value_id');
    }
}