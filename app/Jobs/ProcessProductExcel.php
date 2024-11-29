<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\SimpleExcel\SimpleExcelReader;
use Illuminate\Support\Facades\Log;
use App\Models\BulkFileUpload;
use App\Models\Product;
use App\imports\BulkProductImport;
use Illuminate\Foundation\Bus\Dispatchable;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Bus\Queueable;


class ProcessProductExcel implements ShouldQueue
{   

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath, $fileUpload;


    /**
     * Create a new job instance.
     */
    public function __construct(BulkFileUpload $fileUpload)
    {
        // $this->filePath = $filePath;
        $this->fileUpload = $fileUpload;        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {   
      $Path = storage_path('app/public/' . $this->fileUpload->file_path);
    //   \Log::info("File path: " . $filePath);
      
        Excel::import(new BulkProductImport, $Path);
        $this->fileUpload->status = 'completed';
        $this->fileUpload->save();
    //     $fileUpload = BulkFileUpload::find($this->fileUploadId);
    // $fileUpload->update(['status' => 'processing']);
   

    // try {
    //     // Process the Excel file
       
    //     $path = Storage::disk('public')->path($this->filePath);
    //     $rows = SimpleExcelReader::create($path)->fromSheetName("Sheet1")->getRows()
    //             ->filter(function(array $rowProperties) {
    //                 return strlen($rowProperties['name']) > 5;
    //              });

    //     $totalListings = $rows->count();
    //     $successfulListings = 0;
    //     $failedListings = 0;
       

    //     foreach ($rows as $row) {
    //         try {
    //             // Assume your import logic goes here
    //             $slug = Product::generateUniqueSlug($row['name']);
    //             Product::create([
                    
    //                 'name' => $row['name'], 
    //                 'slug' => $slug,
    //                 'sku' => $row['sku'],
    //                 'description' => $row['description']
    //                 ]
    //             );
    //             $successfulListings++;
    //         } catch (\Exception $e) {
    //             $failedListings++;
    //             Log::error("Row failed: " . $e->getMessage());
    //         }
    //     }

    //             $fileUpload->update([
    //                 'status' => 'completed',
    //                 'total_listings' => $totalListings,
    //                 'successful_listings' => $successfulListings,
    //                 'failed_listings' => $failedListings,
    //             ]);

    // } catch (\Exception $e) {
    //     $fileUpload->update([
    //         'status' => 'failed',
    //         'error_message' => $e->getMessage(),
    //     ]);
    // }

    // // Clean up
    // Storage::delete($this->filePath);
    }
}
