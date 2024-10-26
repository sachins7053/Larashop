<?php

namespace App\Http\Controllers\Api;

use App\Models\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(){

        $brands = Brand::get();
        if($brands){
            return response()->json($brands, 200);  // return the brand data with HTTP status 200 (OK)
        } 
        else {
            return response()->json(['message' => 'No brand found'], 404);}

    }
        public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:191',
            'description' => 'nullable|string|max:400',
            'website' => 'nullable|url|max:191',
            'logo' => 'nullable|string|max:191', // Assuming it's a string path
            'status' => 'required|string|in:published,draft', // Add any other statuses if necessary
            'order' => 'required|integer|min:0',
            'is_featured' => 'required|boolean'
        ]);

        // Create the brand in the database
        $brand = Brand::create($validated);

        // Return a success response
        return response()->json([
            'message' => 'Brand created successfully',
            'brand' => $brand
        ], 200);
    }

            public function show($id)
        {
            $brand = Brand::find($id);

            if (!$brand) {
                return response()->json(['message' => 'Brand not found'], 404);
            }

            return response()->json($brand, 200);
        }


        public function update(Request $request, $id)
        {
            $brand = Brand::find($id);

            if (!$brand) {
                return response()->json(['message' => 'Brand not found'], 404);
            }

            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'required|string|max:191',
                'description' => 'nullable|string|max:400',
                'website' => 'nullable|url|max:191',
                'logo' => 'nullable|string|max:191', // Assuming it's a string path
                'status' => 'required|string|in:published,draft',
                'order' => 'required|integer|min:0',
                'is_featured' => 'required|boolean'
            ]);

            // Update brand with validated data
            $brand->update($validated);

            // Return a success response
            return response()->json([
                'message' => 'Brand updated successfully',
                'brand' => $brand
            ], 200);
        }

        public function destroy($id)
            {
                $brand = Brand::find($id);

                if (!$brand) {
                    return response()->json(['message' => 'Brand not found'], 404);
                }

                $brand->delete();

                return response()->json(['message' => 'Brand deleted successfully'], 200);
            }


}

