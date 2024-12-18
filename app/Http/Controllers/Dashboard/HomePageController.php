<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Pages;
use App\Models\Product;


class HomePageController extends Controller
{
    public function index()
    {
        return inertia('Admin/Pages/PageBuilder', [
            'layout' => Pages::latest()->first(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required',
        ]);

        $layout = Pages::create($validated);

        return response()->json($layout);
    }

    public function showLatest()
    {
        $layout = Pages::where('type', 'home')->first();
        return inertia('Welcome', ['content' => $layout->content]);
    }
}
