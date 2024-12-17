<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Pages;


class HomePageController extends Controller
{
    public function index() :Response {
        return Inertia::render('PageBuilder/Index');
    }

    public function getPage($id) {
        $page = Pages::findOrFail($id);
        return response()->json($page);
    }

    public function savePage(Request $request) {
        $data = $request->validate([
            'id' => 'nullable|integer',
            'name' => 'required|string',
            'components' => 'required|json'
        ]);

        if ($data['id']) {
            $page = Pages::findOrFail($data['id']);
            $page->update($data);
        } else {
            $page = Pages::create($data);
        }

        return response()->json($page);
    }
}
