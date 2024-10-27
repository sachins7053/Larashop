<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::get();
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
        // Create the Product in the database
        $product = Product::create($request->all());
        
        // Return a success response
        return response()->json([
            'message' => 'Product created successfully',
            'data' => $request->all(),
        ], 200);
    }

    public function show($id)
    {
        $Product = Product::find($id);

        if (!$Product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($Product, 200);
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
