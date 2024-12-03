<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Inertia\Response;
use Inertia\Inertia;

class FilesController extends Controller
{
    public function index() {
        $files = File::all()->map(function ($file) {
            return [
                'id' => $file->id,
                'name' => $file->original_name,
                'url' => asset( $file->file_path),
            ];
        });
        return response()->json($files);
    }
    public function AllFiles():Response {
        $files = File::get()->map(function ($file) {
            return [
                'id' => $file->id,
                'title' => $file->original_name,
                'alt' => $file->original_name,
                'url' => asset( $file->file_path),
            ];
        });
     
        return Inertia::render('Admin/Pages/MediaFile',compact('files'));
    }


    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048', // Adjust validation rules as needed
        ]);

        $file = $request->file('file');
        $folder = now()->format('Y-m'); // Folder named by year-month format
        $path = $file->store("uploads/$folder", 'public'); // Store the file in the public directory

        // Save file details to the database
        $fileRecord = new File();
        $fileRecord->filename = $file->hashName(); // Stored filename
        $fileRecord->original_name = $file->getClientOriginalName(); // Original filename
        $fileRecord->file_type = $file->getClientMimeType(); // File MIME type
        $fileRecord->file_path = "storage/$path"; // File path
        $fileRecord->size = $file->getSize(); // File size in bytes
        $fileRecord->save();

        // Return response with file URL and database ID
        return response()->json([
            'url' => asset("storage/$path"),
            'file_id' => $fileRecord->id,
        ], 201);

    }
}
