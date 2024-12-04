<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Leads;
use App\Models\LeadNotes;
use App\Models\User;

class LeadController extends Controller
{
    public function index() :Response {
        
        $leads = Leads::all();
        return Inertia::render('Admin/Leads/Leadindex', ['leads' => $leads]);
    }
    public function show($id) :Response {

        $lead = Leads::with('user','notes')->find($id);

        $lead->image_url = array_map(function ($image) {
            return asset('storage/' . $image); // Assuming your images are stored in 'storage/app/public/'
        }, $lead->image_url);
        
        return Inertia::render('Admin/Leads/ViewLead',[ 'lead' => $lead]);
    }
    public function store(Request $request) :RedirectResponse{

        $imagesArray = [];
        if($request->has('images')){
            $images = $request->file('images');
            if($images){
                foreach($images as $image){
                    $imageName = time().'.'.$image->getClientOriginalExtension();
                    $path =$image->store("uploads/$imageName", 'public');
                    $imagesArray[] = $path;
                }
            }

        }

        $lead = Leads::create([
            'user_id' => auth()->user()->id,
            'customer_name' => $request->name,
            'customer_email' => $request->email,
            'customer_address' => $request->address,
            'mobile_no' => $request->mobile,
            'lead_details' => $request->details,
            'image_url' => $imagesArray,
            'link' => $request->link,

        ]);

        return redirect()->intended(route('partner.dashboard', absolute: false));
        
    }
    public function add() :Response {
        
        return Inertia::render('Admin/Leads/AddLead');
    }

    public function AddNote(Request $request) :RedirectResponse 
    {
        $note = LeadNotes::create([
            'lead_id' => $request->id,
            'note' => $request->note,
        ]);

        return redirect()->intended(route('leads.show', ['id' => $request->id] , absolute: false ));
    }
}
