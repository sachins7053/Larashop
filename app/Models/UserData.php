<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{   
    protected $table = 'users_data';
    protected $fillable = [
        'user_id',
        'phone',
        'address',
        'street_address',
        'city',
        'state',
        'country',
        'zip_code',

    ];

    public function user() {
        return $this->belongsTo(User::class);
    }



}
