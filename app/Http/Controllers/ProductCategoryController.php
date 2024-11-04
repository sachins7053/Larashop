<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCat;

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
       
}
