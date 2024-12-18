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
use App\Models\ProductCatLinking;
use App\Models\ProductAttribute;
use App\Models\AttributeValue;
use App\Models\VariationAttribute;
use Illuminate\Support\Facades\DB;



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
                'mrp' => $firstVariation->price,
                'salePrice' => $firstVariation->sale_price,
                'sku' => $firstVariation->sku,
                'stock' => $firstVariation->stock,
                'attributes' => $attributes,
            ];
        })->values(); 
        
        $Attributes = ProductAttribute::with('values')->get(); 
        // $product_var = $product->variations;
        $categories = ProductCat::all();
        return Inertia::render('Admin/Pages/EditProduct', compact('product', 'categories', 'product_var', 'Attributes'));
        
    }

    public function Update(Request $request, $id)
        {
            $Product = Product::find($id);

            if (!$Product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'required|string|max:191',
                'description' => 'nullable|string|max:400',
                'content' => 'nullable|string',
                'images' => 'nullable', // Assuming it's a string path
                // 'status' => 'required|string|in:published,Active,draft', // Add any other statuses if necessary
                'price' => 'required|integer|min:0',
                'sale_price' => 'nullable|integer|min:0',
            ]);

            // dd($request);

           Product::updateOrCreate(
                ['id' => $request->id],
                [
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'content' => $request->content,
                'quantity' => $request->quantity,
                'wide' => $request->wide,
                'height' => $request->height,
                'length' => $request->length,
                'weight' => $request->weight,
                'images' => $request->images,
                'sku' => $request->sku,
                // 'status' => $request->status,
            ]);

            if ($request->has('categories')) {
                foreach ($request->categories as $category) {
                    // Step 1: Check if the record exists
                    $exists = DB::table('cat_product')
                        ->where('product_id', $request->id)
                        ->exists();
            
                    // Step 2: If it exists, delete the record
                    if ($exists) {
                        DB::table('cat_product')
                            ->where('product_id', $request->id)
                            ->delete();
                    }
            
                    // Step 3: Insert the new record
                    DB::table('cat_product')->insert([
                        'product_id' => $request->id,
                        'category_id' => $category['id'],
                    ]);
                }
            }
         

            if($request->has('variations')) {   

                foreach ($request->variations as $variationData) {   
                    ProductVariation::where('variation_id', $variationData['variation_id'])->delete();

                    $variation = ProductVariation::updateOrCreate(
                        [
                            'variation_id' => $variationData['variation_id'], // Assuming this is the unique identifier
                        ],
                        [
                            'product_id' => $request->id,
                            'price' => $variationData['mrp'],
                            'sale_price' => $variationData['salePrice'],
                            'stock' => $variationData['stock'],
                            'sku' => $variationData['sku'],
                            // Add other fields as necessary
                        ]
                    );
                
                    // Handle attribute values for this variation
                    if ($variation) {

                        // VariationAttribute::where('variation_id', $variation->id )->delete();

                        foreach ($variationData['attributes'] as $attributeValue) {
                            // Assuming attributeValue contains 'attribute_name' and 'value'
                            $attributeName = $attributeValue['attribute_name'];
                            $value = $attributeValue['attribute_value'];
                
                            // Retrieve the attribute ID based on the name
                            $attribute = ProductAttribute::where('attribute_name', $attributeName)->first();
                            $attributeId = $attribute ? $attribute->id : null;
                
                            // Retrieve the value ID based on the value
                            $attributeValueRecord = AttributeValue::where('value', $value)->first();
                            $valueId = $attributeValueRecord ? $attributeValueRecord->id : null;
                
                            // Only attach if both IDs are found
                            if ($attributeId && $valueId) {
                                // Attach the attribute to the variation without detaching existing ones
                                VariationAttribute::create([
                                    'variation_id' => $variation->id,
                                    'attribute_id' => $attribute->id,
                                    'value_id' => $value->id,
                                   ]);
                            }
                        }
                    }
                }

            }

            // Update Product with validated data
            // $Product->update($validated);

            // Return a success response
            return response()->json([
                'message' => 'Product updated successfully',
                'Product' => $Product
            ], 200);
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


                public function getProducts(Request $request)
                {
                    $query = Product::query();

                    // Handle the category filter
                    if ($request->has('category')) {
                        $query->where('category', $request->category);
                    }

                    // Handle sorting
                    if ($request->has('sort')) {
                        $query->orderBy($request->sort, $request->direction ?? 'asc');
                    }

                    // Handle the limit
                    $limit = $request->has('limit') ? (int) $request->limit : 10; // Default to 10 products
                    $products = $query->take($limit)->get();

                    return $products;
                }

}
