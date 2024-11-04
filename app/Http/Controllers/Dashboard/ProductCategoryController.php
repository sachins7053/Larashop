<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProductCat;

class ProductCategoryController extends Controller
{
    public function categories(): Response
    {
        // Fetch product categories from the database
        $categories = ProductCat::get();

        // Return the view with the fetched categories
        return Inertia::render('Admin/Pages/Categories', $categories);
    }

    public function edit_cat($id): Response
    {   
        // Fetch product categories from the database
        $category = ProductCat::find($id);

        // Return the view with the fetched categories
        return Inertia::render('Admin/Pages/EditCategory', $category);
    }
}

