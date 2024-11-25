<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\ProductCat;
use App\Models\BulkFileUpload;
use App\Jobs\ProcessProductExcel;


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


    public function bulkUpload(Request $request) : RedirectResponse
            {   
                
                $request->validate([
                    'file' => 'required|mimes:xlsx,xls,csv',
                    'zip_file' => 'nullable|mimes:zip',
                ]);

                // Upload Excel File
                $excelPath = $request->file('file')->store('temp/uploads', 'public');
                
                $fileUpload = BulkFileUpload::create([
                    
                    'file_name' => $request->file('file')->getClientOriginalName(),
                    'user_id' => auth()->user()->id,
                    'file_path' => $excelPath,
                    'status' => 'pending',
                ]);
                
                // Dispatch Job for Excel Processing with fileUpload ID
                
                    ProcessProductExcel::dispatch($excelPath, $fileUpload->id);
                    return redirect()->intended(route('bulkproduct.status', absolute:false));
                
            }
        
            public function bulkUploadStatus()
                {
                    $fileUploads = BulkFileUpload::Latest()->get();

                    return Inertia::render('Admin/Pages/BulkProductStatus', [
                        'fileUploads' => $fileUploads,
                    ]);
                }
}
