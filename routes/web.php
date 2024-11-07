<?php

use App\Http\Controllers\FilesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductCategoryController;
use App\Http\Controllers\CartCheckoutCouponController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/upload', [FilesController::class, 'upload']);
Route::get('/checkout', [CartCheckoutCouponController::class, 'checkout']);
Route::get('/product/demo', [ProductController::class, 'ProductPage']);
Route::get('/product/{slug}', [ProductController::class, 'ProductDisplay']);
Route::get('/category', [ProductController::class, 'Category']);

Route::middleware('role_or_permission:Admin')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::get('/product/edit/{id}', [ProductController::class, 'Edit'])->name('product.edit');
    Route::get('/product-categories', [ProductCategoryController::class, 'categories']);
    Route::get('/product-categorie/edit/{id}', [ProductCategoryController::class, 'edit_cat']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
