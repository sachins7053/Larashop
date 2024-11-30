<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelReader;
use Illuminate\Support\Facades\Log;
use App\Models\BulkFileUpload;
use App\Models\Product;
use Illuminate\Support\Facades\DB;



class ProcessBulkProductUploading implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath, $fileUploadId;

    

    /**
     * Create a new job instance.
     */
    public function __construct($filePath, $fileUploadId)
    {
        $this->filePath = $filePath;
        $this->fileUploadId = $fileUploadId;        
    }


    /**
     * Execute the job.
     */
    public function handle(): void

    {   


        $fileUpload = BulkFileUpload::find($this->fileUploadId);
        $fileUpload->update(['status' => 'processing']);

        try {
            // Process the Excel file
           
            $path = Storage::disk('public')->path($this->filePath);
            $rows = SimpleExcelReader::create($path)->fromSheetName("Sheet1")->getRows()
                        ->filter(function(array $rowProperties) {
                            return isset($rowProperties['name']) && strlen($rowProperties['name']) > 5;
                        })->collect();
    
            $totalListings = $rows->count();
            $successfulListings = 0;
            $failedListings = 0;
    
            foreach ($rows as $row) {
             
                    // Log::info('Processing row: ' . json_encode($row));
                    // Assume your import logic goes here
                    $slug = Product::generateUniqueSlug($row['name']);
                    Product::create([
                               
                        'name' => $row['name'],
                        'slug' => $slug,
                        'sku' => $row['sku'],
                        'description' => $row['description']
                        ]
                    );
                    
                
            }
    
                    // $fileUpload->update([
                    //     'status' => 'completed',
                    //     'total_listings' => $totalListings,
                    //     'successful_listings' => $successfulListings,
                    //     'failed_listings' => $failedListings,
                    // ]);
    
        } catch (\Exception $e) {
            Log::error("Job failed: " . $e->getMessage());
            Log::info("Starting job for file: {$this->filePath}");
            Log::info("Updating file upload status to 'processing'");
            $fileUpload->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);
            throw $e;
        }
    
        // Clean up
        // Storage::delete($this->filePath);
    }
}
