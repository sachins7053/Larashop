<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('Admin/Pages/AllProducts');
    }
    
    public function add(): Response 
    {
        return Inertia::render('Admin/Pages/AddProduct');
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
}
