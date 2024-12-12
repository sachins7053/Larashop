<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Support\Facades\Response as LaravelResponse;
use App\Http\Controllers\Controller;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\ProductCat;
use App\Models\BulkFileUpload;
use App\Jobs\ProcessProductExcel;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BulkProductUpload;
use App\Models\ProductVariation;




class ProductController extends Controller
{   
    private function formatAttributes($variations)
    {
        $attributes = [];

        foreach ($variations as $variation) {
            if ($variation && isset($variation->name)) {
                $attributeName = ucfirst($variation->name);

                foreach ($variation->variationvalues as $value) {
                    if ($value) {
                        $attributeValue = [
                            'value_id' => $value->variation_attribute_id,
                            'value_name' => $value->values
                        ];

                        // Find if the attribute already exists
                        $existingAttribute = '';
                        foreach ($attributes as &$attribute) {
                            if (is_array($attribute) && isset($attribute['attribute_name']) && $attribute['attribute_name'] === $attributeName) {
                                $existingAttribute = &$attribute;
                                break;
                            }
                        }

                        if ($existingAttribute) {
                            // Append to the existing attribute values if not already present
                            if (!in_array($attributeValue, $existingAttribute['values'])) {
                                $existingAttribute['values'][] = $attributeValue;
                            }
                        } else {
                            // Create a new attribute entry
                            $attributes[] = [
                                'attribute_id' => $variation->variation_id, // Assuming unique ID for each attribute type
                                'attribute_name' => $attributeName,
                                'values' => [$attributeValue]
                            ];
                        }
                    }
                }
            }
        }

        return $attributes;
    }

    private function formatVariations($variations)
    {
        return $variations->map(function ($variation) {
            $formattedAttributes = [];
            if ($variation && isset($variation->name)) {
                foreach ($variation->variationvalues as $value) {
                    if ($value) {
                        $formattedAttributes[ucfirst($variation->name)] = $value->values;
                    }
                }

                return [
                    'variation_id' => $variation->variation_id,
                    'attributes' => $formattedAttributes,
                    'price' => $variation->price,
                    'stock' => $variation->stock_status
                ];
            }
        })->filter()->toArray();
    }
        



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


    public function ProductDisplay($id)
    {   
    
        // $product = Product::with(['categories.products','variations' => function($query){
        //     $query->leftJoin('variation_attributes as var_att','var_att.variation_id', 'product_variations.variation_id')->leftjoin('attribute_values as value', 'value.value_id', 'var_att.value_id')->leftjoin('attributes', 'attributes.attribute_id','value.attribute_id')->select('attributes.attribute_name','product_variations.*','var_att.*', 'value.*');
        // }])->find($id);
        // $product = Product::with(['categories.products','variations' => function($query){
        //     $query->leftJoin('attributes','attributes.attribute_id', 'product_variations.attribute_id')->select('attributes.*','product_variations.*');
        // }])->find($id);

        $productsData = Product::with('categories')
    ->leftJoin('product_variations as v', 'products.id', '=', 'v.product_id')
    ->leftJoin('variation_attributes as va', 'va.variation_id', '=', 'v.variation_id')
    ->leftJoin('attribute_values as value', 'value.value_id', '=', 'va.value_id')
    ->leftJoin('attributes as a', 'a.attribute_id', '=', 'value.attribute_id')
    ->select(
        'products.*',  // Selecting all fields from products
        'v.variation_id',
        'v.price as variation_price',
        'v.sale_price as variation_sale_price',
        'v.sku',
        'v.stock',
        'va.attribute_id',
        'va.variation_attribute_id',
        'value.value_id',
        'value.value as attribute_value',
        'a.attribute_name'
    )
    ->where('products.id', '=', $id)
    ->get();

// Check if the product type is 'variable'
if ($productsData->first()->product_type == 'variable') {
    // Group variations by product ID and variation_id
    $products = $productsData->groupBy('id')->map(function ($group) {
        $product = $group->first(); // Get the main product details
        
        // Group variations by `variation_id`
        $variations = $group->groupBy('variation_id')->map(function ($variationGroup) {
            $firstVariation = $variationGroup->first(); // Base details for the variation
            
            // Collect attributes for this variation
            $attributes = $variationGroup->filter(function ($item) {
                return $item->attribute_name !== null && $item->attribute_value !== null;
            })->map(function ($item) {
                return [
                    'attribute_name' => $item->attribute_name,
                    'attribute_value' => $item->attribute_value,
                ];
            })->values();
            
            // Return merged variation with attributes
            return [
                'variation_id' => $firstVariation->variation_id,
                'price' => $firstVariation->variation_price,
                'sale_price' => $firstVariation->variation_sale_price,
                'sku' => $firstVariation->sku,
                'stock' => $firstVariation->stock,
                'attributes' => $attributes,
            ];
        })->values(); // Ensure the variations are returned as a collection
        
        // Assign merged variations to the product
        $product->variations = $variations;
        
        return $product;
    })->values()->first(); // Fetch the first product as we expect a single product

    // Convert to JSON
    $product = $products->toJson(JSON_PRETTY_PRINT);
} else {
    // For non-variable products, just return the product with price from products table
    $product = $productsData->first();

    // Set the price and sale_price from the products table
    $product->price = $product->price ?? null;
    $product->sale_price = $product->sale_price ?? null;
}

// Optionally return or output the $product

    
    // Optionally return or output the $product
    

// echo $product;

    
       
        
        if (!$product) {
            return Redirect::route('404');
        }

        $relatedProducts = Product::with('categories.products')
        ->where('id', '!=', $id) // Exclude the current product
        ->get();

      
        
        
        
        
        return Inertia::render('Frontend/ProductPage', compact('product', 'relatedProducts'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }

    public function search(Request $request) :Response {
        $keyword = $request->query('keyword');
        $products = Product::where('name', 'like', '%' . $keyword . '%')->with('categories', 'variations')->get();
        // dd($products);
        return Inertia::render('Frontend/Search', compact( 'keyword','products'));
    }

    public function bulkUploadForm(Request $request): Response{
        return Inertia::render('Admin/Pages/BulkProductUpload');
    }

    public function csvDownload(Request $request) {

        return Excel::download(new BulkProductUpload, 'product_bulk_upload.xlsx');

    }


    public function bulkUpload(Request $request) : RedirectResponse
            {   
                
                $request->validate([
                    'file' => 'required|mimes:xlsx,xls,csv',
                    'zip_file' => 'nullable|mimes:zip',
                ]);

                // Upload Excel File
                $excelPath = $request->file('file')->store('temp/uploads', 'public');
                $zipPath = $request->file('zip_file')->store('temp/uploads' , 'public');
                
                $fileUpload = BulkFileUpload::create([
                    
                    'file_name' => $request->file('file')->getClientOriginalName(),
                    'user_id' => auth()->user()->id,
                    'file_path' => $excelPath,
                    'status' => 'pending',
                ]);
              
                
                // Dispatch Job for Excel Processing with fileUpload ID
                
                    ProcessProductExcel::dispatch($fileUpload , $zipPath);
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
