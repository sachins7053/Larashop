<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OderVendorStatus;

class VendorController extends Controller
{
    public function orderStatus(Request $request): RedirectResponse {

        $status = OrderVendorStatus::create([
            'order_id' => $request->order_id,
            'vendor_id' => $request->vendor_id,
            'status' => $request->status,
        ]);

        if($status){
            return redirect()->back()->with('success', 'Order status updated successfully');
        }
        

    }
}
