<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductVariation;

class VariationAttribute extends Model
{   
    use HasFactory;
    protected $table =   'variation_attributes';
    protected $primaryKey = 'variation_attribute_id';
    protected $fillable = ['variation_id', 'variation_attribute_id', 'value_id'];


    public function variation()
    {
        return $this->belongsTo(ProductVariation::class,);
    }

    public function attribute(){
        return $this->hasOne(AttributeValue::class, 'value_id', 'value_id');
    }

}
