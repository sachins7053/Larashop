<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Leads extends Model
{   
    protected $casts = [
        'image_url' => 'array', // Automatically cast to an array when retrieving
    ];

    use HasFactory; 
    protected $table = "leads";
    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_email',
        'mobile_no',
        'lead_details',
        'image_url',
        'link',
        'status',
        'priority',
        'created_at',
        'updated_at'
        ];

        public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function notes(){

        return $this->hasMany(LeadNotes::class, 'lead_id');
    }
}
