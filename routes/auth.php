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
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
    ->name('register');
    
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('partner/register', [PartnerRegisteredUserController::class, 'createPartner'])->name('partnerRegister');
    Route::post('partner/register', [PartnerRegisteredUserController::class, 'partnerStore']);
    Route::get('partner/login', [PartnerAuthenticatedSessionController::class, 'createPartner'])->name('partnerlogin');
    Route::post('partner/login', [PartnerAuthenticatedSessionController::class, 'store']);  
    Route::get('partner/forgot-password', [PartnerPasswordResetLinkController::class, 'create'])
        ->name('partner-password.request');
    Route::post('partner/forgot-password', [PartnerPasswordResetLinkController::class, 'store'])
        ->name('partner-password.email');    
    Route::get('partner/reset-password/{token}', [partnerNewPasswordController::class, 'create'])
        ->name('partner-password.reset');
    Route::post('partner/reset-password', [PartnerNewPasswordController::class, 'store'])
        ->name('partner-password.store');

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

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::get('partner/verify-email', PartnerEmailVerificationPromptController::class)
        ->name('partner-verification.notice');
    
    Route::get('partner/verify-email/{id}/{hash}', PartnerVerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('partner-verification.verify');

    Route::post('partner/email/verification-notification', [PartnerEmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('partner-verification.send');

    Route::get('partner/confirm-password', [PartnerConfirmablePasswordController::class, 'show'])
        ->name('partner-password.confirm');

    Route::post('partner/confirm-password', [PartnerConfirmablePasswordController::class, 'store']);

    Route::put('partner/password', [PartnerPasswordController::class, 'update'])->name('partner-password.update');

    Route::post('partner-logout', [PartnerAuthenticatedSessionController::class, 'destroy'])
        ->name('partner.logout');
});