<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Pages;
use App\Models\Product;


class HomePageController extends Controller
{
    public function editHome()
    {
        return inertia('Admin/Pages/PageBuilder', [
            'layout' => Pages::latest()->first(),
        ]);
    }
    public function index()
    {
        $pages = Pages::latest()->get();
        // dd($pages);
        return inertia('Admin/Pages/AllPages', compact('pages') );
    }



    public function addPage(){
        return Inertia::render('Admin/Pages/AddPage');
    }
    public function editPage(Request $request, $id){
        $page = Pages::find($id);
        return Inertia::render('Admin/Pages/EditPage', compact('page'));
    }
    public function updatePage(Request $request, $id):RedirectResponse{
        $page = Pages::find($id);
        $page->title = $request->title;
        $page->content = $request->content;
        $page->save();
        return redirect()->intended(route('pages.edit', ['id' => $id] , absolute: false ));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required',
            'status' => 'required',

        ]);
        $slug = Pages::generateUniqueSlug($request->title);
        $page = Pages::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'status' => $request->status,
            'type' => 'default',
        ]);
        return redirect()->route('pages.edit', ['id' => $page->id]);
    }

    public function showLatest()
    {
        $layout = Pages::where('type', 'home')->first();
        return inertia('Welcome', ['content' => $layout->content]);
    }
}
