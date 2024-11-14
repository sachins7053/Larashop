<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Leads extends Model
{
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

        public function users()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
