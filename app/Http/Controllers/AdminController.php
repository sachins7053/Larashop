<?php

namespace App\Http\Controllers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Vendor;
use App\Models\Orders;
use App\Models\Orderitems;
use App\Models\OrderVendorStatus;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index(): Response 
    {   
        $salesReport = Orders::with('orderItems')->get();

        $topSellingProducts = OrderItems::select('product_id', DB::raw('SUM(quantity) as total_quantity'))
            ->groupBy('product_id')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'product_id' => $item->product_id,
                    'quantity_sold' => $item->total_quantity,
                    // Optionally fetch product details
                    'product_name' => $item->product->name ?? 'Unknown Product', 
                ];
            });

        $topVendors = OrderVendorStatus::select('vendor_id', DB::raw('COUNT(*) as total_orders'))
            ->groupBy('vendor_id')
            ->orderByDesc('total_orders')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'vendor_id' => $item->vendor_id,
                    'orders_count' => $item->total_orders,
                    'vendor_name' => $item->vendor->name ?? 'Unknown Vendor', 
                ];
            });

        return Inertia::render('Admin/Dashboard', [ 'salesReport' => $salesReport, 'topProducts' => $topSellingProducts, 'topVendors' => $topVendors, ]);

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
