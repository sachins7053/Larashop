<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Slider;

class SliderController extends Controller
{
    public function index(){
        return view('dashboard.slider.index');
    }
}
