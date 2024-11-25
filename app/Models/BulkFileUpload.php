<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BulkFileUpload extends Model
{
    protected $table = 'bulk_file_uploads';
    protected $fillable = [
        'user_id',
        'file_name',
        'uploaded_at',
        'status',
        'total_listings',
        'success_listings',
        'failed_listings',
        'error_messages',
        'error_codes',
        'error_logs',
        'processed_listings',
    ];
}
