<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vendor;

class AdminController extends Controller
{
    public function index(): Response 
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function vendors() : Response {
        $vendors = Vendor::leftJoin('users', 'users.id', 'vendors.user_id')->select('vendors.id', 'vendors.business_name', 'vendors.gst_number', 'vendors.created_at', 'users.name', 'vendors.status')->paginate(10);
        
      
        return Inertia::render('Admin/Vendors/AllVendors', compact('vendors'));
    }

    public function vendorShow($id) : Response {
        $vendorData = Vendor::where('id', $id)->with(['user','products' => function ($query) {
            $query->limit(5); }] )->get();

        $vendors = $vendorData->toArray();  
        $vendor = head($vendors); 
      
        return Inertia::render('Admin/Vendors/VendorDetails', compact('vendor'));
    }

    public function vendorEdit(Request $request, Vendor $id) : RedirectResponse{

        
        $id->status = $request->status;
        $id->save();

        return redirect()->back();

    }
}
