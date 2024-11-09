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


    if (!$category) {
        return response()->json(['error' => 'Category not found'], 404);
    }


    $products = $category->products();

    $start = (int) $request->query('start', 0);
    $end = (int) $request->query('end', 2); 

    // Paginate the products based on start and end
    $paginatedProducts = $products->skip($start)->take($end - $start)->get();

    // Return the category and its paginated products as JSON
    return response()->json($paginatedProducts, 200);

    }

 
       
}
