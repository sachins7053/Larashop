<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\ProductCat;


class ProductController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('Admin/Pages/AllProducts');
    }
    
    public function add(): Response 
    {   
        $categories = ProductCat::get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });
        return Inertia::render('Admin/Pages/AddProduct' , ['categories' => $categories]);
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
        \DB::enableQueryLog();
        //$product = Product::find($id);
        /*
        $product = Product::where('products.id', $id) // Filter by product ID
    ->leftJoin('product_variations', 'product_variations.product_id', '=', 'products.id')
    ->leftJoin('variation_attributes', 'variation_attributes.variation_id', '=', 'product_variations.variation_id')
    ->leftJoin('attribute_values', 'attribute_values.value_id','variation_attributes.value_id') 
    ->leftJoin('attributes', 'attributes.attribute_id' ,'attribute_values.value_id')
    ->select(
        'products.*',
        'product_variations.*',
        'variation_attributes.*',
        'attribute_values.*',
        'attributes.*'
    )
    ->get(); */
        
        $product = Product::with([
            'variations' => function($query) {
                $query->leftJoin('attribute_values', 'attribute_values.value_id = product_variations.value')->select('attribute_values.*')->get();
            }
        ])->find($id);
        
        //dd($product);
        if (!$product) {
            // Handle the case where the product is not found (optional)
            return response()->json(['message' => 'Product not found'], 404);
        }
        dd(\DB::getQueryLog());
    
        return Inertia::render('Frontend/ProductPage', compact('product'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }
}
