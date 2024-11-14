<?php

use App\Http\Controllers\FilesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductCategoryController;
use App\Http\Controllers\Dashboard\LeadController;
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

Route::get('/admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['role_or_permission:Admin|Partner'])->name('dashboard');

Route::post('/upload', [FilesController::class, 'upload']);
Route::get('/checkout', [CartCheckoutCouponController::class, 'checkout']);
Route::get('/product/demo', [ProductController::class, 'ProductPage']);
Route::get('/product/{slug}', [ProductController::class, 'ProductDisplay']);
Route::get('/category', [ProductController::class, 'Category']);
Route::get('/category/{slug}', [ProductCategoryController::class, 'CategoryProduct']);

Route::middleware('role_or_permission:Admin|Partner')->group(function () {
    Route::get('/admin/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/admin/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::get('/admin/product/edit/{id}', [ProductController::class, 'Edit'])->name('product.edit');
    Route::get('/admin/product-categories', [ProductCategoryController::class, 'categories'])->name('categories');
    Route::get('/admin/product-categorie/edit/{id}', [ProductCategoryController::class, 'edit_cat']);
    Route::get('/admin/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/admin/lead/add', [LeadController::class, 'add'])->name('leads.add');
    Route::post('/admin/lead/add', [LeadController::class, 'store'])->name('leads.store');
    Route::get('/admin/lead/view/{id}', [LeadController::class, 'show'])->name('leads.show');
    Route::get('/admin/lead/update/{id}', [LeadController::class, 'update'])->name('leads.update');
    Route::get('/admin/partners', [ProfileController::class, 'index'])->name('partners.index');
    Route::get('/admin/partner/{id}', [ProfileController::class, 'show'])->name('partners.show');
    Route::get('/admin/partner/edit/{id}', [ProfileController::class, 'edit'])->name('partners.edit');
    Route::get('/admin/users', [ProfileController::class, 'index'])->name('user.index');
    Route::get('/admin/user/{id}', [ProfileController::class, 'show'])->name('user.show');
    Route::get('/admin/user/edit/{id}', [ProfileController::class, 'edit'])->name('user.edit');
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
