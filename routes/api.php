<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductVariation;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\Api\TaxController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\Api\UserCartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('brands', BrandController::class);
Route::apiResource('stores', StoreController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('taxes', TaxController::class);
Route::apiResource('categories', ProductCategoryController::class);
//Route::apiResource('attributes', AttributeController::class);
Route::apiResource('files', FilesController::class);
route::apiResource('usercart.cart', UserCartController::class);
route::delete('cart/item/{userid}/{itemid}', [UserCartController::class, 'removeCartItem']);

// Cart routes
// Route::middleware('guest')->group(function () {
//     Route::get('/cart/get/{userId}', [CartController::class, 'getCart']);

//     Route::put('/cart/sync/{userId}', [CartController::class, 'syncCart']);
//     Route::post('/cart/sync/{userId}', [CartController::class, 'syncCart']);
//     Route::get('/cart/sync/{userId}', [CartController::class, 'syncCart']);
//     Route::post('/cart/clear', [CartController::class, 'clearCart']);
// });

Route::get('/product-category', [ProductCategoryController::class , 'CategoryProduct']);
Route::get('/pro-cat', [ProductCategoryController::class , 'categories']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
