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
use App\Http\Controllers\Dashboard\HomePageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CouponController;
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
Route::get('/category/{slug}', [ProductCategoryController::class, 'products']);
Route::get('/search', [ProductController::class, 'Search'])->name('search');
Route::post('/cart/add/{userId}', [CartCheckoutCouponController::class, 'syncCart']);
Route::get('login', [CustomerController::class, 'dashboard']);


Route::middleware([\App\Http\Middleware\CustomerMiddleware::class])->group(function () {

    Route::get('/myaccount', [CustomerController::class, 'dashboard'])->name('customer.account');
    Route::get('/myaccount/orders', [CustomerController::class, 'orders'])->name('customer.orders');
    Route::get('/myaccount/orders/{orderid}', [CustomerController::class, 'Order_details'])->name('orders.details');
    Route::get('/myaccount/profile', [CustomerController::class, 'profile'])->name('customer.profile');
    Route::post('review/add', [ReviewController::class, 'submitReview'])->name('submit.review');

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
    Route::get('/orders', [OrderController::class, 'index'])->name('vendor.order.index');
    Route::get('/order/{id}', [OrderController::class, 'show'])->name('vendor.order.show');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('vendor-profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('vendor-profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('vendor-profile.destroy');
});


Route::prefix('admin')->middleware('role_or_permission:Admin')->group(function () {
    Route::get('/page-builder', [HomePageController::class, 'index'])->name('page-builder');
    Route::get('/page/{id}', [HomePageController::class, 'getPage']);
    Route::post('/page/save', [HomePageController::class, 'savePage']);
    Route::get('/products', [ProductController::class, 'index'])->name('product.index');
    Route::get('/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::get('/product/bulkuploading', [ProductController::class, 'bulkUploadForm'])->name('bulkproduct.add');
    Route::post('/product/bulkuploading', [ProductController::class, 'bulkUpload']);
    Route::get('/product/csv-downloading', [ProductController::class, 'csvDownload'])->name('download.csv');
    Route::get('/product/bulkuploadstatus', [ProductController::class, 'bulkUploadStatus'])->name('bulkproduct.status');
    Route::get('/product/edit/{id}', [ProductController::class, 'Edit'])->name('product.edit');
    Route::patch('/product/edit/{id}', [ProductController::class, 'Update'])->name('product.update');
    Route::get('/product-categories', [ProductCategoryController::class, 'categories'])->name('categories');
    Route::get('/product-categorie/edit/{id}', [ProductCategoryController::class, 'edit_cat']);
    Route::get('/media', [FilesController::class, 'AllFiles'])->name('media.index');
    Route::get('/leads', [LeadController::class, 'index'])->name('leads.index');
    Route::get('/lead/add', [LeadController::class, 'add'])->name('admin.leads.add');
    Route::get('/lead/view/{id}', [LeadController::class, 'show'])->name('leads.show');
    Route::post('/lead/note/{id}', [LeadController::class, 'AddNote'])->name('leads.Note');
    Route::get('/partners', [PartnerController::class, 'index'])->name('partners.index');
    Route::get('/partner/{id}', [PartnerController::class, 'show'])->name('partners.show');
    Route::post('/partner/change_status/{id}', [PartnerController::class, 'change_status'])->name('partners.status');
    Route::get('/partner/edit/{id}', [PartnerController::class, 'edit'])->name('partners.edit');
    Route::get('/vendors', [AdminController::class, 'vendors'])->name('vendor.index');
    Route::get('/vendor/{id}', [AdminController::class, 'vendorShow'])->name('vendor.show');
    Route::put('/vendor/{id}', [AdminController::class, 'vendorEdit'])->name('vendor.edit');
    Route::get('/orders', [OrderController::class, 'index'])->name('order.index');
    Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show');
    Route::put('/order/{id}', [OrderController::class, 'change_status'])->name('order.statusChange');
    Route::post('/order/assignVendor/', [OrderController::class, 'assignVendor'])->name('assignVendor');
    Route::get('/coupons', [CouponController::class, 'index']);
    Route::get('/coupon/add', [CouponController::class, 'addCoupon'])->name('coupon.store');
    Route::post('/coupon/add', [CouponController::class, 'store']);
    Route::get('/coupon/{id}', [CouponController::class, 'show'])->name('coupon.show');
    Route::get('/users', [ProfileController::class, 'index'])->name('user.index');
    Route::get('/user/{id}', [ProfileController::class, 'show'])->name('user.show');
    Route::get('/user/edit/{id}', [ProfileController::class, 'edit'])->name('user.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
