<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProductVariation;

class VariationAttribute extends Model
{   
    protected $table =   'variation_attributes';
    protected $primaryKey = 'variation_attribute_id';
    protected $fillable = ['variation_id', 'variation_attribute_id', 'value_id'];


    public function variation()
    {
        return $this->belongsTo(ProductVariation::class, 'variation_id', 'variation_id');
    }
    public function attribute()
    {
        return $this->belongsTo(AttributeValue::class, 'value_id', 'value_id');
    }

}
