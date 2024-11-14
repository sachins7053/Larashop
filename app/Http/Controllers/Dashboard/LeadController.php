<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Leads;
use App\Models\User;

class LeadController extends Controller
{
    public function index() :Response {
        
        $leads = Leads::all();
        return Inertia::render('Admin/Leads/Leadindex', ['leads' => $leads]);
    }
    public function show($id) :Response {

        $lead = Leads::where('leads.id', $id)->leftJoin('users', 'users.id', 'leads.user_id')->select('leads.*', 'users.name')->get();
        
        return Inertia::render('Admin/Leads/EditLead',[ 'lead' => $lead]);
    }
    public function store(Request $request) :RedirectResponse{

        $lead = Leads::create([
            'user_id' => auth()->user()->id,
            'customer_name' => $request->name,
            'customer_email' => $request->email,
            'mobile_no' => $request->mobile,
            'lead_details' => $request->details,
            'image_url' => $request->image,
            'link' => $request->link,

        ]);

        return redirect()->intended(route('leads.index', absolute: false));
        
    }
    public function add() :Response {
        
        return Inertia::render('Admin/Leads/AddLead');
    }
    public function update() {

    }
}
