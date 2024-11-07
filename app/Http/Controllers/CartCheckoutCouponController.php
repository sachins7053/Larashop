<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartCheckoutCouponController extends Controller
{
    public function checkout(): Response {

        return Inertia::render('Checkout');
    }
}
