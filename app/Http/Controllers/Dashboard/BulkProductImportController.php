<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Jobs\ProcessProductExcel;
use App\Jobs\ProcessProductImages;
use ZipArchive;

class BulkProductImportController extends Controller
{
    public function uploadFiles(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|mimes:xlsx,xls',
            'images_zip' => 'nullable|mimes:zip',
        ]);

        // Upload Excel File
        $excelPath = $request->file('excel_file')->store('temp/uploads');

        // Dispatch Job for Excel Processing
        ProcessProductExcel::dispatch($excelPath);

        // Handle ZIP File if provided
        if ($request->hasFile('images_zip')) {
            $zipPath = $request->file('images_zip')->store('temp/uploads');
            ProcessProductImages::dispatch($zipPath);
        }

        return response()->json(['message' => 'Files uploaded successfully. Processing in the background.'], 200);
    }
}
