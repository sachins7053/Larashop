<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProductCat;
use App\Models\ProductAttribute;

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

        $category = ProductCat::find($id);


        return Inertia::render('Admin/Pages/EditCategory', $category);
    }

    public function CategoryProduct($slug):Response {
        $category = ProductCat::where('slug', $slug )->first();
        if (!$category) {
            abort(404, 'Category not found');
        }
    
        return Inertia::render('Frontend/Category', [
            'category' => $category,
        ]);
    }
    
    public function products(Request $request, $slug): Response {

        $query = ProductCat::with(['products' => function ($q) {
            $q->leftJoin('product_variations as v', 'products.id', '=', 'v.product_id')
              ->leftJoin('variation_attributes as va', 'va.variation_id', '=', 'v.variation_id')
              ->leftJoin('attribute_values as value', 'value.value_id', '=', 'va.value_id')
              ->leftJoin('attributes as a', 'a.attribute_id', '=', 'value.attribute_id')
              ->select(
                  'products.*',
                  'v.variation_id',
                  'v.price as variation_price',
                  'v.sale_price as variation_sale_price',
                  'v.sku',
                  'v.stock',
                  'va.variation_attribute_id',
                  'value.value_id',
                  'value.value as attribute_value',
                  'a.attribute_name',
                  'a.attribute_id'
              );
        }])
        ->where('product_categories.slug', $slug);
    
        // Apply price filters
        if ($request->filled('price_min')) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('v.price', '>=', $request->input('price_min'))
                         ->orWhere('v.sale_price', '>=', $request->input('price_min'))
                         ->orWhere('products.sale_price', '>=', $request->input('price_min'))
                         ->orWhere('products.price', '>=', $request->input('price_min'));
            });
        }
    
        if ($request->filled('price_max')) {
            $price_max = $request->input('price_max');
            $query->where(function ($subQuery) use ($price_max) {
                $subQuery->where('v.sale_price', '<=', $price_max)
                         ->orWhere('v.price', '<=', $price_max)
                         ->orWhere('products.sale_price', '<=', $price_max)
                         ->orWhere('products.price', '<=', $price_max);
            });
        }
    
        if ($request->filled('attributes')) {
            $attributeFilters = $request->input('attributes');
            $query->whereHas('products.variations', function ($subQuery) use ($attributeFilters) {
                $subQuery->whereIn('va.value_id', $attributeFilters);
            });
        }
    
        // Separate query for max and min price
        $priceQuery = DB::table('products')
        ->leftJoin('product_variations as v', 'products.id', '=', 'v.product_id')
        ->leftJoin('cat_product as cat', 'cat.product_id', '=', 'products.id')
        ->join('product_categories', 'product_categories.id', '=', 'cat.category_id')
        ->where('product_categories.slug', $slug);

            // Use the calculation inside the aggregate function
            $maxPrice = $priceQuery
                ->selectRaw('MAX(COALESCE(v.price, v.sale_price, products.sale_price, products.price)) as max_price')
                ->value('max_price');

            $minPrice = $priceQuery->min(DB::raw('COALESCE(products.sale_price,v.sale_price, v.price,  products.price)'));;
            
        // Get paginated products
        $products = $query->paginate(12);
    
        // Get all categories and attributes for filtering
        $categories = ProductCat::all();
        $attributes = ProductAttribute::with('values')->get();
    
        // Return data to Inertia view
        return inertia('Frontend/CatProducts', [
            'title' => $products->first()->name,
            'products' =>  $products->first()->products,
            'categories' => $categories,
            'attributes' => $attributes,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
            'filters' => $request->only(['category', 'price_min', 'price_max', 'rating', 'attributes']),
            'max_price' => $maxPrice,
            'min_price' => $minPrice,
        ]);
    }
    
    
    
}

