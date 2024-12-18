<?php

namespace App\Http\Controllers\Api;
use  App\Http\Controllers\Api\ProductVariation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductCatLinking;
use App\Models\ProductAttribute;
use App\Models\ProductVariations;
use App\Models\VariationAttribute;
use App\Models\AttributeValue;



class ProductController extends Controller
{
    public function index(){
        $products = Product::Latest()->with('categories')->get();
        if($products){
            return response()->json($products, 200);  // return the Product data with HTTP status 200 (OK)
        } 
        else {
            return response()->json(['message' => 'No Product found'], 404);}
    }

    public function store(Request $request)
    {
        /*
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'description' => 'nullable|string|max:400',
            'content' => 'nullable|string|max:191',
            'images' => 'nullable|string|max:191', // Assuming it's a string path
            'status' => 'required|string|in:published,draft', // Add any other statuses if necessary
            'price' => 'required|integer|min:0',
            'sale_price' => 'nullable|integer|min:0',
        ]);
*/
        $slug = Product::generateUniqueSlug($request->name);
        // Create the Product in the database
        $product = Product::create([
            'name' => $request->productName,
            'slug' => $slug,
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
            'status' => $request->status,
        ]);

        ProductCatLinking::Create([
            'product_id' => $product->id,
            'category_id' => $request->category,
        ]);

        // $categories = json_decode($request->input('categories'), true);
        // foreach($categories as $category){
        //     $cat = \App\Models\ProductCatLinking::create([
        //         'category_id' => $category,
        //         'product_id' =>  $product->id,
        //         //'attributes' => json_encode($variationData['attributes']),
        //     ]);
        // }

        if ($request->has('variations')) {
            $variations = json_decode($request->input('variations'), true);
 
            // Create variations
          
            
            foreach ($variations as $variationData) {   

            $variation = \App\Models\ProductVariation::create([
                    'product_id' =>  $product->id,
                    //'attributes' => json_encode($variationData['attributes']),
                    'price' => $variationData['mrpPrice'],
                    'sale_price' => $variationData['salePrice'],
                    'sku' => $variationData['stock']
                ]);

                // Handle attribute values for this variation
            if (isset($variationData['attribute_values'])) {
                foreach ($variationData['attribute_values'] as $attributeValue) {
                    $value = AttributeValue::where('value', $attributeValue)->first();
                    if ($value) {
                        // Attach the attribute value to the variation
                        $variation->VariationsAttributes()->attach($value->id);
                    }
                }
            }
    
        }
        
        // Return a success response
        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 200);

       // return response()->json($product->load('variations'), 201);

    }
}

    public function show($id)
    {
        $product = Product::with(['variations' => function($query){
            $query->leftJoin('attributes','attributes.attribute_id', 'product_variations.attribute_id')->select('attributes.*','product_variations.*');
        }])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
        {
            $Product = Product::find($id);

            if (!$Product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'required|string|max:191',
                'description' => 'nullable|string|max:400',
                'content' => 'nullable|string|max:191',
                'images' => 'nullable|string|max:191', // Assuming it's a string path
                'status' => 'required|string|in:published,draft', // Add any other statuses if necessary
                'price' => 'required|integer|min:0',
                'sale_price' => 'nullable|integer|min:0',
            ]);

            // Update Product with validated data
            $Product->update($validated);

            // Return a success response
            return response()->json([
                'message' => 'Product updated successfully',
                'Product' => $Product
            ], 200);
        }

    public function destroy($id)
            {
                $Product = Product::find($id);

                if (!$Product) {
                    return response()->json(['message' => 'Product not found'], 404);
                }

                $Product->delete();

                return response()->json(['message' => 'Product deleted successfully'], 200);
            }

            
}
