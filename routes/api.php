<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductVariation;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\CartCheckoutCouponController;
use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\FilesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('brands', BrandController::class);
Route::apiResource('stores', StoreController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('taxes', TaxController::class);
Route::apiResource('categories', ProductCategoryController::class);
//Route::apiResource('attributes', AttributeController::class);
Route::apiResource('files', FilesController::class);
route::apiResource('pro-variation', ProductVariation::class);

// Add auth:sanctum middleware to cart routes
    Route::get('/cart', [CartCheckoutCouponController::class, 'getCart']);
    Route::post('/cart/sync', [CartCheckoutCouponController::class, 'syncCart']);

Route::get('/product-category', [ProductCategoryController::class , 'CategoryProduct']);
Route::get('/pro-cat', [ProductCategoryController::class , 'categories']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
