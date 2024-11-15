<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadNotes extends Model
{
    use HasFactory;

    protected $table = "lead_notes";

    protected $fillable = [
        'lead_id',
        'note',
    ];

    public function leads() {

        return $this->belongsTo(Leads::class, 'id');
    }
}
