<?php

use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\TaxController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('brands', BrandController::class);
Route::apiResource('stores', StoreController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('taxes', TaxController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
