<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Orders;
use App\Models\OrderItems;
use App\Models\User;
use App\Models\Product;

class CustomerController extends Controller
{
    public function dashboard(): Response {

        return Inertia::render('Frontend/CustomerPanel/Dashboard');

    }

    public function orders():Response {
        $orders = Orders::where('orders.user_id', auth()->user()->id)->leftJoin('users', 'users.id', 'orders.user_id')
        ->select('orders.id as orderid', 'orders.total_amount', 'orders.status as order_status', 'users.name as username', 'orders.created_at as order_date' )->get();

        return Inertia::render('Frontend/CustomerPanel/Orders', ['orders' => $orders]);

        // return Inertia::render('Frontend/CustomerPanel/OrderDetails', );
    }

    public function Order_details($orderid):Response {
        $order = Orders::where('id', $orderid)->with(['orderItems.product', 'user'])->get();
        return Inertia::render('Frontend/CustomerPanel/OrderDetails', ['order' => $order]);

        // return Inertia::render('Frontend/CustomerPanel/OrderDetails', );
    }

    public function profile() : Response{
        $user = User::where('id', auth()->user()->id)->get();
        return Inertia::render('Frontend/CustomerPanel/ProfileEdit', ['user' => $user]);
    }

    public function login() : Response{

    }
}
