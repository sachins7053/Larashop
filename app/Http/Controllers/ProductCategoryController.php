<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCat;
use App\Models\Product;
use Inertia\response;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('limit', 10); 
        $page = $request->get('page', 1);

        $categories = ProductCat::paginate($perPage, ['*'], 'page', $page);
        return response()->json([
            'items' => $categories->items(),
            'total' => $categories->total(),
            'current_page' => $categories->currentPage(),
            'last_page' => $categories->lastPage(),
        ]);
    }

    public function store(Request $request){
        $category = ProductCat::create($request->all());
        return response()->json($category, 201);
    }

    public function update(Request $request, $id){
        $category = ProductCat::find($id);
        $category->update($request->all());
        return response()->json($category, 200);
    }

    public function categories(){
        $categories = ProductCat::all();
        return response()->json($categories);
    }

    public function destroy($id){
        ProductCat::destroy($id);
        return response()->json(null, 204);
    }

    public function CategoryProduct(Request $request) {
        $slug = $request->query('category', '');
        $category = ProductCat::where('slug', $slug)->first();

    // If the category does not exist, return a 404 response
    if (!$category) {
        return response()->json(['error' => 'Category not found'], 404);
    }

    // Retrieve products associated with the category
    $products = $category->products();

    // Get start and end parameters from the request
    $start = (int) $request->query('start', 0); // Default to 0 if not provided
    $end = (int) $request->query('end', 20); // Default to 20 if not provided

    // Paginate the products based on start and end
    $paginatedProducts = $products->skip($start)->take($end - $start)->get();

    // Return the category and its paginated products as JSON
    return response()->json([
        'category' => $category,
        'products' => $paginatedProducts
    ], 200);

    }

 
       
}
