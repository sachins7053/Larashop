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
use App\Models\File;
use App\imports\BulkProductImport;
use Illuminate\Foundation\Bus\Dispatchable;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Bus\Queueable;


class ProcessProductExcel implements ShouldQueue
{   

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected  $fileUpload, $zipFilePath;


    /**
     * Create a new job instance.
     */
    public function __construct(BulkFileUpload $fileUpload, $zipFilePath)
    {
        $this->fileUpload = $fileUpload;        
        $this->zipFilePath = $zipFilePath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {   
      $Path = storage_path('app/public/' . $this->fileUpload->file_path);
      Excel::import(new BulkProductImport, $Path);

    
      $this->processImages($this->zipPath);

    //   $zipPath = storage_path('app/public/' . $this->zipFilePath);

    //   $this->extractZipFile($this->zipPath, $zipPath);
    // //   \Log::info("File path: " . $filePath);
    // $this->processImages($excelData[0], $extractedPath);


        $this->fileUpload->status = 'completed';
        $this->fileUpload->save();
 
    }

                protected function extractZipFile($zipPath, $destinationPath)
                {
                    $zip = new \ZipArchive;
                    if ($zip->open($zipPath) === TRUE) {
                        $zip->extractTo($destinationPath);
                        $zip->close();
                    } else {
                        throw new \Exception("Failed to extract ZIP file.");
                    }
                }

                protected function processImages($zipPath)
                {
                    // Extract ZIP
                    $destinationFolder = now()->format('Y-m');
                    $extractedPath = storage_path("app/public/uploads/$destinationFolder");
                    $this->extractZipFile($zipPath, $extractedPath);
                
                    $skus = Product::pluck('sku')->toArray(); // Fetch all SKUs from the database
                
                    foreach ($skus as $sku) {
                        $folderPath = $extractedPath . '/' . $sku;
                
                        if (is_dir($folderPath)) {
                            $images = scandir($folderPath);
                
                            $imagePaths = []; // To collect image paths
                
                            foreach ($images as $image) {
                                $filePath = $folderPath . '/' . $image;
                
                                if (in_array(pathinfo($image, PATHINFO_EXTENSION), ['jpg', 'png', 'jpeg'])) {
                                    // Move file to public/uploads/{year-month}
                                    $newPath = "uploads/$destinationFolder/" . $image;
                                    $publicPath = storage_path("app/public/$newPath");
                
                                    if (!file_exists(dirname($publicPath))) {
                                        mkdir(dirname($publicPath), 0755, true);
                                    }
                
                                    copy($filePath, $publicPath);
                
                                    // Save image to Files database (optional)
                                    $fileRecord = new Files();
                                    $fileRecord->filename = pathinfo($image, PATHINFO_BASENAME);
                                    $fileRecord->original_name = $image;
                                    $fileRecord->file_type = mime_content_type($filePath);
                                    $fileRecord->file_path = "storage/$newPath";
                                    $fileRecord->size = filesize($filePath);
                                    $fileRecord->save();
                
                                    // Add the image path to the array
                                    $imagePaths[] = "storage/$newPath";
                                }
                            }
                
                            // Update the product table with image array
                            Product::where('sku', $sku)->update([
                                'images' => json_encode($imagePaths), // Store as JSON array
                            ]);
                
                            echo "Updated images for SKU: $sku.\n";
                        } else {
                            echo "No folder found for SKU: $sku\n";
                        }
                    }
                }
}
