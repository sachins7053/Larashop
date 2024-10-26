<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    protected $table ='specifications';
    protected $fillable = [
        'name',
        'description',
        'author_type',
        'author_id',
    ];
}
