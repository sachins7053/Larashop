<?php

use App\Http\Controllers\FilesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductCategoryController;
use App\Http\Controllers\Dashboard\PartnerController;
use App\Http\Controllers\Dashboard\LeadController;
use App\Http\Controllers\CustomerController;
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
})->name('home');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['role_or_permission:Admin|Partner'])->name('dashboard');

Route::post('/upload', [FilesController::class, 'upload']);
Route::get('/product/demo', [ProductController::class, 'ProductPage']);
Route::get('/product/{slug}', [ProductController::class, 'ProductDisplay']);
Route::get('/category', [ProductController::class, 'Category']);
Route::get('/checkout', [CartCheckoutCouponController::class, 'checkout']);
Route::get('/category/{slug}', [ProductCategoryController::class, 'CategoryProduct']);
Route::post('/cart/add/{userId}', [CartCheckoutCouponController::class, 'syncCart']);
Route::middleware([\App\Http\Middleware\CustomerMiddleware::class])->group(function () {
    Route::get('/myaccount', [CustomerController::class, 'dashboard'])->name('customer.account');

});

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
    Route::post('/admin/lead/note/{id}', [LeadController::class, 'AddNote'])->name('leads.Note');
    Route::get('/admin/partners', [PartnerController::class, 'index'])->name('partners.index');
    Route::get('/admin/partner/{id}', [PartnerController::class, 'show'])->name('partners.show');
    Route::post('/admin/partner/change_status/{id}', [PartnerController::class, 'change_status'])->name('partners.status');
    Route::get('/admin/partner/edit/{id}', [PartnerController::class, 'edit'])->name('partners.edit');
    Route::get('/admin/users', [ProfileController::class, 'index'])->name('user.index');
    Route::get('/admin/user/{id}', [ProfileController::class, 'show'])->name('user.show');
    Route::get('/admin/user/edit/{id}', [ProfileController::class, 'edit'])->name('user.edit');
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
