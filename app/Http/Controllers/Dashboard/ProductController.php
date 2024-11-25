<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\ProductCat;
use App\Models\BulkFileUpload;


class ProductController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('Admin/Pages/AllProducts');
    }
    
    public function add(): Response 
    {   
        $categories = ProductCat::all();
        
        return Inertia::render('Admin/Pages/AddNewProduct' , ['categories' => $categories]);
    }

    public function Edit($id): Response 
    {   
        $product = Product::where('id', $id)->first();
        $variations = $product->variations;
        return Inertia::render('Admin/Pages/EditProduct', compact('product'));
        //return Inertia::render('Admin/Pages/AddProduct');
    }

    public function ProductPage(): Response
    {
        return Inertia::render('ProductPage');
    }


    public function ProductDisplay($id): Response
    {   
        $product = Product::with(['variations' => function($query){
            $query->leftJoin('attributes','attributes.attribute_id', 'product_variations.attribute_id')->select('attributes.*','product_variations.*');
        }])->find($id);
        
        return Inertia::render('Frontend/ProductPage', compact('product'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }

    public function bulkUploadForm(Request $request): Response{
        return Inertia::render('Admin/Pages/BulkProductUpload');
    }


    public function bulkUpload(Request $request)
            {
                $request->validate([
                    'excel_file' => 'required|mimes:xlsx,xls',
                    'images_zip' => 'nullable|mimes:zip',
                ]);
            
                // Upload Excel File
                $excelPath = $request->file('excel_file')->store('temp/uploads');
            
                $fileUpload = BulkFileUpload::create([
                    'file_name' => $request->file('excel_file')->getClientOriginalName(),
                    'status' => 'pending',
                ]);
            
                // Dispatch Job for Excel Processing with fileUpload ID
                ProcessProductExcel::dispatch($excelPath, $fileUpload->id);
            
                return response()->json(['message' => 'Files uploaded successfully. Processing in the background.'], 200);
            }
        
            public function bulkUploadStatus()
                {
                    $fileUploads = FileUpload::latest()->get();

                    return Inertia::render('UploadStatus', [
                        'fileUploads' => $fileUploads,
                    ]);
                }
}
