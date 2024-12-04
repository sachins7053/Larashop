<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Orders;
use App\Models\Vendor;
use App\Models\OrderVendorStatus;

class OrderController extends Controller
{
    public function index() :Response{
        $orders = Orders::leftJoin('users', 'users.id', 'orders.user_id')
        ->select('orders.id as orderid', 'orders.total_amount', 'orders.status as order_status', 'users.name as username', 'orders.created_at as order_date' )->paginate(10);
        return Inertia::render('Admin/Orders/AllOrders', ['orders' => $orders]);
    }
    public function show($id) :Response{
        $order = Orders::where('id', $id)->with('orderItems.product', 'orderVendorStatus', 'user')->get();
        $vendors = Vendor::where('status', 'Active')->select('id','business_name',)->get();

        $orderData = $order->toArray();  // Convert the Eloquent model to an array if it's not already
    $orderFirstElement = head($orderData); 
        return Inertia::render('Admin/Orders/OrderDetails', ['order' => $orderFirstElement, 'vendors' => $vendors]);
    }

    public function change_status(Request $request, $id) :RedirectResponse{
        $order = Orders::find($id);
        $order->status = $request->status;
        $order->save();
        return redirect()->back();
    }

    public function assignVendor(Request $request) :RedirectResponse {

        $order = OrderVendorStatus::where('order_id',$request->orderId)->where('vendor_id', $request->vendorId);
        
        if($order) {
            $order->update(['status' => $request->vendorOrderStatus]);
            return redirect()->back();
        }

                OrderVendorStatus::create([
                    'order_id' => $request->orderId,
                    'vendor_id' => $request->vendorId,
                    'status' => 'pending',
                ]);
            

            
       
        return redirect()->back();

    }
}
