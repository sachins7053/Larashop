<?php

namespace App\Models;
use App\Models\ProductAttribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{   
    use HasFactory;
    protected $table =  'attribute_values';
    protected $primaryKey = 'value_id';
    protected $fillable = ['attribute_id', 'value_id', 'value'];

    public function attribute(){

        return $this->belongsTo(ProductAttribute::class);
    }

    public function variations(){
        
        return $this->belongsToMany(ProductVariation::class, 'variation_attributes', 'value_id', 'variation_id');
    }


    public function variation()
    {
        
        return $this->belongsToMany( ProductVariation::class,
        'variation_attributes',       
        'value_id',              
        'variation_id'                    
        )->withPivot('active', 'created_by');;
    }
}