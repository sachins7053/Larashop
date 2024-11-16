<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function dashboard(): Response {

        return Inertia::render('CustomerPanel/Dashboard');

    }
}
