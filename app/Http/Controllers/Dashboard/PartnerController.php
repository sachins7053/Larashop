<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\user;

class PartnerController extends Controller
{
    public function index(): Response 
    {
        $partners = User::role('partner')->get();

        return Inertia::render('Admin/Partners/AllPartners', ['partners' => $partners]);


    }

    public function change_status(Request $request, $id) :RedirectResponse {
        $user = User::find($id);   
        $user->update([
            'status' => $request->status
            ]);
            return redirect()->intended(route('partners.index', absolute: false));
            }
}
