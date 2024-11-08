<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends BaseModel
{   
    protected $table = 'attributes';
    protected $fillable = ['attribute_name'];

    public function values()
    {
        return $this->hasMany(AttributeValue::class);
    }
}
