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
        $product = Product::find($id);
        return Inertia::render('Admin/Pages/EditProduct', compact('product'));
        //return Inertia::render('Admin/Pages/AddProduct');
    }

    public function ProductPage(): Response
    {
        return Inertia::render('ProductPage');
    }
    public function ProductDisplay($id): Response
    {   
        $product = Product::find($id);
        return Inertia::render('Frontend/ProductPage', compact('product'));
    }

    public function Category(): Response
    {
        return Inertia::render('Frontend/Category');
    }
}
