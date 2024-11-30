<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

use App\Http\Controllers\Auth\ChannelPartner\PartnerAuthenticatedSessionController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerConfirmablePasswordController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerEmailVerificationNotificationController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerEmailVerificationPromptController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerNewPasswordController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerPasswordController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerPasswordResetLinkController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerRegisteredUserController;
use App\Http\Controllers\Auth\ChannelPartner\PartnerVerifyEmailController;


use App\Http\Controllers\Auth\Vendor\VendorAuthenticatedSessionController;
use App\Http\Controllers\Auth\Vendor\VendorConfirmablePasswordController;
use App\Http\Controllers\Auth\Vendor\VendorEmailVerificationNotificationController;
use App\Http\Controllers\Auth\Vendor\VendorEmailVerificationPromptController;
use App\Http\Controllers\Auth\Vendor\VendorNewPasswordController;
use App\Http\Controllers\Auth\Vendor\VendorPasswordController;
use App\Http\Controllers\Auth\Vendor\VendorPasswordResetLinkController;
use App\Http\Controllers\Auth\Vendor\VendorRegisteredUserController;
use App\Http\Controllers\Auth\Vendor\VendorVerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    //vendor Auth Routes
    Route::prefix('vendor')->group(function(){
        Route::get('/register', [VendorRegisteredUserController::class, 'createVendor'])->name('vendor.register');
        Route::post('/register', [VendorRegisteredUserController::class, 'vendorStore']);
        Route::get('/login', [VendorAuthenticatedSessionController::class, 'createVendor'])->name('vendorlogin');
        Route::post('/login', [VendorAuthenticatedSessionController::class, 'store']);  
        Route::get('/forgot-password', [VendorPasswordResetLinkController::class, 'create'])->name('vendor-password.request');
        Route::post('/forgot-password', [VendorPasswordResetLinkController::class, 'store'])->name('vendor-password.email');    
        Route::get('/reset-password/{token}', [VendorNewPasswordController::class, 'create'])->name('vendor-password.reset');
        Route::post('/reset-password', [VendorNewPasswordController::class, 'store'])->name('vendor-password.store');

    });

    // Partner Auth Routes
    Route::prefix('partner')->group(function(){
        Route::get('/register', [PartnerRegisteredUserController::class, 'createPartner'])->name('partnerRegister');
        Route::post('/register', [PartnerRegisteredUserController::class, 'partnerStore']);
        Route::get('/login', [PartnerAuthenticatedSessionController::class, 'createPartner'])->name('partnerlogin');
        Route::post('/login', [PartnerAuthenticatedSessionController::class, 'store']);  
        Route::get('/forgot-password', [PartnerPasswordResetLinkController::class, 'create'])->name('partner-password.request');
        Route::post('/forgot-password', [PartnerPasswordResetLinkController::class, 'store'])->name('partner-password.email');    
        Route::get('/reset-password/{token}', [PartnerNewPasswordController::class, 'create'])->name('partner-password.reset');
        Route::post('/reset-password', [PartnerNewPasswordController::class, 'store'])->name('partner-password.store');

    });

    
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('customer/login', [AuthenticatedSessionController::class, 'customerLogin'])->name('customerLogin');
    Route::post('customer/register', [RegisteredUserController::class, 'customerStore'])->name('customerRegister');

    Route::get('admin/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('admin/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');
    
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

        //Vendor Email Routes
        Route::prefix('vendor')->group( function () {
            Route::get('/verify-email', VendorEmailVerificationPromptController::class)->name('vendor-verification.notice');        
            Route::get('/verify-email/{id}/{hash}', VendorVerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('vendor-verification.verify');    
            Route::post('/email/verification-notification', [VendorEmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('vendor-verification.send');    
            Route::get('/confirm-password', [VendorConfirmablePasswordController::class, 'show'])->name('vendor-password.confirm');    
            Route::post('/confirm-password', [VendorConfirmablePasswordController::class, 'store']);    
            Route::put('/password', [VendorPasswordController::class, 'update'])->name('vendor-password.update');   
            Route::post('-logout', [VendorAuthenticatedSessionController::class, 'destroy'])->name('vendor.logout');

        });


        //Partner Email Routes
        Route::prefix('partner')->group( function () {
            Route::get('/verify-email', PartnerEmailVerificationPromptController::class)->name('partner-verification.notice');        
            Route::get('/verify-email/{id}/{hash}', PartnerVerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('partner-verification.verify');    
            Route::post('/email/verification-notification', [PartnerEmailVerificationNotificationController::class, 'store'])->middleware('throttle:6,1')->name('partner-verification.send');    
            Route::get('/confirm-password', [PartnerConfirmablePasswordController::class, 'show'])->name('partner-password.confirm');    
            Route::post('/confirm-password', [PartnerConfirmablePasswordController::class, 'store']);    
            Route::put('/password', [PartnerPasswordController::class, 'update'])->name('partner-password.update');   
            Route::post('-logout', [PartnerAuthenticatedSessionController::class, 'destroy'])->name('partner.logout');

        });
        

    });