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
        return Inertia::render('Admin/Pages/AllPages', compact('pages') );
    }

    public function PageDisplay($slug){
        $page = Pages::where('id', $slug)->where('status', 'active')->first();
        if (!$page) {
            abort(404, 'Page not found');
        }

        if ($page->type == 'home') {
            return redirect()->route('home');
        }

        return Inertia::render('Frontend/Page', compact('page'));
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
        $page->type = $request->type;
        $page->status = $request->status;
        $page->save();
        return redirect()->intended(route('pages.edit', ['id' => $id] , absolute: false ));
    }

    public function store(Request $request):RedirectResponse
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
        return redirect()->intended(route('pages.edit', ['id' => $page->id] , absolute: false ));
    }

    public function showLatest()
    {
        $layout = Pages::where('type', 'home')->first();
        return inertia('Welcome', ['content' => $layout->content]);
    }

    public function deletePage($id){
        $page = Pages::find($id);
        if($page->type !== 'home'){
        $page->delete();
        return response()->json(['message' => 'Page deleted successfully'], 200);
        };
        return response()->json(['message' => 'Product deleted successfully'], 404);
    }
}
