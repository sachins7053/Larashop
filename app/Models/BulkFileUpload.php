<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BulkFileUpload extends Model
{
    protected $table = 'bulk_file_upload';
    protected $fillable = [
        'user_id',
        'file_name',
        'file_path',
        'uploaded_at',
        'status',
        'total_listings',
        'success_listings',
        'failed_listings',
        'error_message',
        'error_codes',
        'error_logs',
        'processed_listings',
    ];
}
