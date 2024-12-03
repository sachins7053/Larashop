<?php

use App\Http\Controllers\FilesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Dashboard\Vendor\ProductController as VendorProductController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductCategoryController;
use App\Http\Controllers\Dashboard\PartnerController;
use App\Http\Controllers\Dashboard\LeadController;
use App\Http\Controllers\Dashboard\OrderController;
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
})->middleware(['role_or_permission:Admin'])->name('dashboard');

route::get('/404', function () {
    return Inertia::render('404');
    })->name('404');





Route::post('/upload', [FilesController::class, 'upload']);
Route::get('/product/demo', [ProductController::class, 'ProductPage']);
Route::get('/product/{slug}', [ProductController::class, 'ProductDisplay'])->name('product.slug');
Route::get('/category', [ProductController::class, 'Category']);
Route::get('/checkout', [CartCheckoutCouponController::class, 'checkout']);
Route::get('/category/{slug}', [ProductCategoryController::class, 'CategoryProduct']);
Route::get('/search', [ProductController::class, 'Search'])->name('search');
Route::post('/cart/add/{userId}', [CartCheckoutCouponController::class, 'syncCart']);
Route::get('login', [CustomerController::class, 'dashboard']);


Route::middleware([\App\Http\Middleware\CustomerMiddleware::class])->group(function () {

    Route::get('/myaccount', [CustomerController::class, 'dashboard'])->name('customer.account');
    Route::get('/myaccount/orders', [CustomerController::class, 'orders'])->name('customer.orders');
    Route::get('/myaccount/orders/{orderid}', [CustomerController::class, 'Order_details'])->name('orders.details');
    Route::get('/myaccount/profile', [CustomerController::class, 'profile'])->name('customer.profile');

});


Route::prefix('partner')->middleware('role_or_permission:Admin|Agent')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('PartnerPanel/PartnerDashboard');
    })->name('partner.dashboard');
    Route::get('/leads', [LeadController::class, 'index'])->name('partner-leads.index');
    Route::get('/lead/add', [LeadController::class, 'add'])->name('leads.add');
    Route::post('/lead/add', [LeadController::class, 'store'])->name('leads.store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('partner-profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('partner-profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('partner-profile.destroy');
});

Route::prefix('vendor')->middleware('role_or_permission:Admin|Vendor')->group(function () {
    
    Route::get('/dashboard', [VendorProductController::class, 'dashboard'])->name('vendor.dashboard');
    Route::get('/products', [VendorProductController::class, 'index'])->name('vendorproduct.index');
    Route::get('/product/edit/{id}', [VendorProductController::class, 'Edit'])->name('vendor.product.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('vendor-profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('vendor-profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('vendor-profile.destroy');
});


Route::middleware('role_or_permission:Admin')->group(function () {
    Route::get('/admin/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/admin/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::get('/admin/product/bulkuploading', [ProductController::class, 'bulkUploadForm'])->name('bulkproduct.add');
    Route::post('/admin/product/bulkuploading', [ProductController::class, 'bulkUpload']);
    Route::get('/admin/product/csv-downloading', [ProductController::class, 'csvDownload'])->name('download.csv');
    Route::get('/admin/product/bulkuploadstatus', [ProductController::class, 'bulkUploadStatus'])->name('bulkproduct.status');
    Route::get('/admin/product/edit/{id}', [ProductController::class, 'Edit'])->name('product.edit');
    Route::patch('/admin/product/edit/{id}', [ProductController::class, 'Update'])->name('product.update');
    Route::get('/admin/product-categories', [ProductCategoryController::class, 'categories'])->name('categories');
    Route::get('/admin/product-categorie/edit/{id}', [ProductCategoryController::class, 'edit_cat']);
    Route::get('/admin/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/admin/lead/view/{id}', [LeadController::class, 'show'])->name('leads.show');
    Route::post('/admin/lead/note/{id}', [LeadController::class, 'AddNote'])->name('leads.Note');
    Route::get('/admin/partners', [PartnerController::class, 'index'])->name('partners.index');
    Route::get('/admin/partner/{id}', [PartnerController::class, 'show'])->name('partners.show');
    Route::post('/admin/partner/change_status/{id}', [PartnerController::class, 'change_status'])->name('partners.status');
    Route::get('/admin/partner/edit/{id}', [PartnerController::class, 'edit'])->name('partners.edit');
    Route::get('/admin/vendors', [AdminController::class, 'vendors'])->name('vendor.index');
    Route::get('/admin/vendor/{id}', [AdminController::class, 'vendorShow'])->name('vendor.show');
    Route::put('/admin/vendor/{id}', [AdminController::class, 'vendorEdit'])->name('vendor.edit');
    Route::get('/admin/orders', [OrderController::class, 'index'])->name('order.index');
    Route::get('/admin/order/{id}', [OrderController::class, 'show'])->name('order.show');
    Route::put('/admin/order/{id}', [OrderController::class, 'change_status'])->name('order.statusChange');
    Route::get('/admin/users', [ProfileController::class, 'index'])->name('user.index');
    Route::get('/admin/user/{id}', [ProfileController::class, 'show'])->name('user.show');
    Route::get('/admin/user/edit/{id}', [ProfileController::class, 'edit'])->name('user.edit');
    Route::get('/admin/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/admin/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/admin/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
