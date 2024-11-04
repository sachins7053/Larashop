<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VariationAttribute extends Model
{   
    protected $table =   'variation_attributes';
    protected $fillable = ['variation_id', 'attribute_value_id'];
}
