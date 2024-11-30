<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\VerifyEmail;
use App\Notifications\VerifyVendorEmail;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Leads;
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, HasApiTokens;

    public function AgentsendEmailVerificationNotification()
    {       
        
        $this->notify(new VerifyEmail);

    }
    public function VendorVerificationEmail()
    {       
        
        $this->notify(new VerifyEmail);

    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function leads()
    {
        return $this->hasMany(Leads::class, 'user_id');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function user_data() {
        return $this->hasMany(UserData::class, 'user_id');
    }

    public function orders() {
        return $this->hasMany(Orders::class, 'user_id');
    }

    public function vendor(){
        return $this->hasOne(Vendor::class, 'user_id');
    }
}
