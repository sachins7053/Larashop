<?php

namespace App\Http\Controllers\Auth\Channelpartner;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerEmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('partner.dashboard', absolute: false))
                    : Inertia::render('Auth/Partner/VerifyEmail', ['status' => session('status')]);
    }
}
