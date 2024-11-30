<?php

namespace App\Http\Controllers\Auth\vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VendorEmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('vendor.dashboard', absolute: false))
                    : Inertia::render('Auth/Vendor/VerifyEmail', ['status' => session('status')]);
    }
}
