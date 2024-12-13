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
use App\Models\ProductAttribute;
use Illuminate\Support\Facades\DB;



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

                        
                        $existingAttribute = '';
                        foreach ($attributes as &$attribute) {
                            if (is_array($attribute) && isset($attribute['attribute_name']) && $attribute['attribute_name'] === $attributeName) {
                                $existingAttribute = &$attribute;
                                break;
                            }
                        }

                        if ($existingAttribute) {
                            
                            if (!in_array($attributeValue, $existingAttribute['values'])) {
                                $existingAttribute['values'][] = $attributeValue;
                            }
                        } else {
                            
                            $attributes[] = [
                                'attribute_id' => $variation->variation_id, 
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

        $variations = ProductVariation::where('product_variations.product_id', $product->id)
        ->leftJoin('variation_attributes as va', 'va.variation_id', '=', 'product_variations.variation_id')
        ->leftJoin('attribute_values as value', 'value.value_id', '=', 'va.value_id')
        ->leftJoin('attributes as a', 'a.attribute_id', '=', 'value.attribute_id')
        ->select(
            'product_variations.*',
            'va.variation_attribute_id',
            'value.value_id',
            'value.value as attribute_value',
            'a.attribute_name',
            'a.attribute_id'
        )
        ->get();

        $product_var = $variations->groupBy('variation_id')->map(function ($variationGroup) {
            $firstVariation = $variationGroup->first(); 
            
            
            $attributes = $variationGroup->filter(function ($item) {
                return $item->attribute_name !== null && $item->attribute_value !== null;
            })->map(function ($item) {
                return [
                    'attribute_name' => $item->attribute_name,
                    'attribute_value' => $item->attribute_value,
                ];
            })->values();
            
            
            return [
                'variation_id' => $firstVariation->variation_id,
                'price' => $firstVariation->price,
                'sale_price' => $firstVariation->sale_price,
                'sku' => $firstVariation->sku,
                'stock' => $firstVariation->stock,
                'attributes' => $attributes,
            ];
        })->values(); 

        // $product_var = $product->variations;
        $categories = ProductCat::all();
        return Inertia::render('Admin/Pages/EditProduct', compact('product', 'categories', 'product_var'));
        
    }



    public function ProductPage(): Response
    {
        return Inertia::render('ProductPage');
    }


    public function ProductDisplay($id)
    {   
    
        
        
        
        
        
        

        $productsData = Product::with('categories')
    ->leftJoin('product_variations as v', 'products.id', '=', 'v.product_id')
    ->leftJoin('variation_attributes as va', 'va.variation_id', '=', 'v.variation_id')
    ->leftJoin('attribute_values as value', 'value.value_id', '=', 'va.value_id')
    ->leftJoin('attributes as a', 'a.attribute_id', '=', 'value.attribute_id')
    ->select(
        'products.*',  
        'v.variation_id',
        'v.price as variation_price',
        'v.sale_price as variation_sale_price',
        'v.sku',
        'v.stock',
        
        'va.variation_attribute_id',
        'value.value_id',
        'value.value as attribute_value',
        'a.attribute_name',
        'a.attribute_id'
    )
    ->where('products.slug', '=', $id)
    ->where('products.status', '=', 'published')
    ->get();
        // dd($productsData);

        if ($productsData->first() == null) {
            return Redirect::route('404');
        }

if ($productsData->first()->product_type == 'variable') {
    
    $products = $productsData->groupBy('id')->map(function ($group) {
        $product = $group->first(); 
        
        
        $variations = $group->groupBy('variation_id')->map(function ($variationGroup) {
            $firstVariation = $variationGroup->first(); 
            
            
            $attributes = $variationGroup->filter(function ($item) {
                return $item->attribute_name !== null && $item->attribute_value !== null;
            })->map(function ($item) {
                return [
                    'attribute_name' => $item->attribute_name,
                    'attribute_value' => $item->attribute_value,
                ];
            })->values();
            
            
            return [
                'variation_id' => $firstVariation->variation_id,
                'price' => $firstVariation->variation_price,
                'sale_price' => $firstVariation->variation_sale_price,
                'sku' => $firstVariation->sku,
                'stock' => $firstVariation->stock,
                'attributes' => $attributes,
            ];
        })->values(); 
        
        
        $product->variations = $variations;
        
        return $product;
    })->values()->first(); 

    
    $product = $products->toJson(JSON_PRETTY_PRINT);
} else {
    
    $product = $productsData->first();

    
    $product->price = $product->price ?? null;
    $product->sale_price = $product->sale_price ?? null;
} 
       

        $relatedProducts = Product::with('categories.products')
        ->where('id', '!=', $id) 
        ->get();

      
        
        
        
        
        return Inertia::render('Frontend/ProductPage', compact('product', 'relatedProducts'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }

    public function search(Request $request): Response {
        // Start building the query
        $query = Product::with('categories')
        ->leftJoin('product_variations as v', 'products.id', '=', 'v.product_id')
        ->leftJoin('variation_attributes as va', 'va.variation_id', '=', 'v.variation_id')
        ->leftJoin('attribute_values as value', 'value.value_id', '=', 'va.value_id')
        ->leftJoin('attributes as a', 'a.attribute_id', '=', 'value.attribute_id')
        ->select(
            'products.*',  
            'v.variation_id',
            'v.price as variation_price',
            'v.sale_price as variation_sale_price',
            'v.sku',
            'v.stock',
            'va.variation_attribute_id',
            'value.value_id',
            'value.value as attribute_value',
            'a.attribute_name',
            'a.attribute_id'
        )
        ->where('products.name', 'like', '%' . $request->query('keyword') . '%')->where('products.status', 'published');

        if ($request->filled('category')) {
            $category = $request->input('category');
            $query->whereHas('categories', function ($subQuery) use ($category) {
                // Filter for products that have any of the selected attributes
                $subQuery->whereIn('product_categories.id', $category);
            });
        }
    
        // Apply price_min filter
        if ($request->filled('price_min')) {
            $query->where(function ($subQuery) use ($request) {
                // Filter for variable products
                $subQuery->where('v.price', '>=', $request->input('price_min'))
                    // Filter for regular products (non-variable)
                    ->orWhere('products.price', '>=', $request->input('price_min'));
            });
        }
    
        // Apply price_max filter
        if ($request->filled('price_max')) {
            $price_max = $request->input('price_max');
            
            $query->where(function ($subQuery) use ($price_max) {
                // Filter for variable products
                $subQuery->where('v.sale_price', '<=', $price_max)
                    ->orWhere('v.price', '<=', $price_max)
                    // Filter for regular products (non-variable)
                    ->orWhere('products.sale_price', '<=', $price_max)
                    ->orWhere('products.price', '<=', $price_max);
            });
        }

        // Apply attributes filter
        if ($request->filled('attributes')) {
            $attributeFilters = $request->input('attributes');
    
            // Apply filtering on product variations using the selected attribute filters
            $query->whereHas('variations', function ($subQuery) use ($attributeFilters) {
                // Filter for products that have any of the selected attributes
                $subQuery->whereIn('va.value_id', $attributeFilters);
            });
        }
        
        $maxPrice = $query->max(DB::raw('COALESCE(v.sale_price, v.price, products.sale_price, products.price)'));


        // Get the minimum price value after applying all filters (but without pagination)
        $minPrice = $query->min(DB::raw('COALESCE(v.sale_price, v.price, products.sale_price, products.price)'));
// Apply any additional filters, such as category or rating
        // If needed, you can add further filter logic here
    
        // Execute the query and paginate the results
        $products = $query->paginate(1);
    
        // Get all categories and attributes for filtering
        $categories = ProductCat::all();
        $attributes = ProductAttribute::with('values')->get();
    
        // Return the response to the frontend (Inertia.js)
        return inertia('Frontend/SearchResult', [
            'keyword' => $request->query('keyword'),
            'products' => $products->items(), // Pass only the product data (not the full pagination object)
            'categories' => $categories,
            'attributes' => $attributes,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
            'filters' => $request->only(['category', 'price_min', 'price_max', 'rating', 'attributes']),
            'max_price' => $maxPrice,  
            'min_price' => $minPrice,
        ]);
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

                
                $excelPath = $request->file('file')->store('temp/uploads', 'public');
                $zipPath = $request->file('zip_file')->store('temp/uploads' , 'public');
                
                $fileUpload = BulkFileUpload::create([
                    
                    'file_name' => $request->file('file')->getClientOriginalName(),
                    'user_id' => auth()->user()->id,
                    'file_path' => $excelPath,
                    'status' => 'pending',
                ]);
              
                
                
                
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
