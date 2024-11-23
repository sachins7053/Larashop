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


    public function ProductDisplay($id): Response
    {   
        $product = Product::with(['variations' => function($query){
            $query->leftJoin('attributes','attributes.attribute_id', 'product_variations.attribute_id')->select('attributes.*','product_variations.*');
        }])->find($id);
        
        return Inertia::render('Frontend/ProductPage', compact('product'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }
}
