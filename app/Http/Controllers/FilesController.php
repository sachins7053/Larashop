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
            'file' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048', 
        ]);

        $file = $request->file('file');
        $folder = now()->format('Y-m'); 
        $path = $file->store("uploads/$folder", 'public'); 

        
        $fileRecord = new File();
        $fileRecord->filename = $file->hashName(); 
        $fileRecord->original_name = $file->getClientOriginalName(); 
        $fileRecord->file_type = $file->getClientMimeType(); 
        $fileRecord->file_path = "storage/$path"; 
        $fileRecord->size = $file->getSize(); 
        $fileRecord->save();

        
        return response()->json([
            'url' => asset("storage/$path"),
            'file_id' => $fileRecord->id,
        ], 201);

    }
}
