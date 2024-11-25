<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\BulkFileUpload;
use Illuminate\Support\Facades\Log;


class ProcessProductExcel implements ShouldQueue
{   

    use InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;


    /**
     * Create a new job instance.
     */
    public function __construct($filePath)
    {
        $this->filepath = $filePath;        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $fileUpload = FileUpload::find($this->fileUploadId);
    $fileUpload->update(['status' => 'processing']);

    try {
        // Process the Excel file
        $path = Storage::path($this->filePath);
        $data = Excel::toCollection([], $path)->first();
        
        $totalListings = $data->count();
        $successfulListings = 0;
        $failedListings = 0;

        foreach ($data as $row) {
            try {
                // Assume your import logic goes here
                Product::updateOrCreate(
                    ['sku' => $row['sku']],
                    ['name' => $row['name'], 'description' => $row['description']]
                );
                $successfulListings++;
            } catch (\Exception $e) {
                $failedListings++;
                Log::error("Row failed: " . $e->getMessage());
            }
        }

        $fileUpload->update([
            'status' => 'completed',
            'total_listings' => $totalListings,
            'successful_listings' => $successfulListings,
            'failed_listings' => $failedListings,
        ]);

    } catch (\Exception $e) {
        $fileUpload->update([
            'status' => 'failed',
            'error_message' => $e->getMessage(),
        ]);
    }

    // Clean up
    Storage::delete($this->filePath);
    }
}
