<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Maatwebsite\Excel\Facades\Excel;

class ProcessProductImages implements ShouldQueue
{   
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $path = Storage::path($this->filePath);
        $extractPath = Storage::path('temp/extracted');

        
        $zip = new ZipArchive;
        if ($zip->open($path) === true) {
            $zip->extractTo($extractPath);
            $zip->close();
        }

        
        foreach (scandir($extractPath) as $folder) {
            if ($folder === '.' || $folder === '..') {
                continue;
            }

            $sku = $folder; 
            $product = Product::where('sku', $sku)->first();

            if ($product) {
                $images = [];
                foreach (scandir("$extractPath/$folder") as $file) {
                    if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png'])) {
                        $imagePath = Storage::putFile("public/products/$sku", "$extractPath/$folder/$file");
                        $images[] = basename($imagePath);
                    }
                }

                
                $product->update(['images' => json_encode($images)]);
            }
        }

        
        Storage::delete($this->filePath);
        Storage::deleteDirectory('temp/extracted');
    }
}
