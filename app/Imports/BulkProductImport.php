<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;

class BulkProductImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {       

        // dd($collection);
        foreach ($collection as $row) {
            // dd($row);

            if (isset($row['name'])) {
            $slug = Product::generateUniqueSlug($row['name']);
            Product::create([
                'name' => $row['name'],
                'slug' => $slug,
                'sku' => $row['sku'],
                'description' => $row['description'],
            ]);
        } else {
            // Handle the case where 'name' doesn't exist
            Log::warning("Missing 'name' field in row: " . json_encode($row));
        }
        }
        
        
    }
}
