<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductVariation;

class VariationAttribute extends Model
{   
    protected $table =   'variation_attributes';
    protected $primaryKey = 'variation_attribute_id';
    protected $fillable = ['variation_id', 'variation_attribute_id', 'value_id', 'testvalue'];


    public function attributeValue()
    {
        return $this->belongsTo(ProductVariation::class);
    }

}
