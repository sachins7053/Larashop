<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Cart;

class CartCheckoutCouponController extends Controller
{
    

    public function checkout(): Response {
        return Inertia::render('Frontend/Checkout');
    }

    public function getCart()
    {   
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->getAll();
        // $cart = $user->cart()->get();
        
        return response()->json($cart);
    }

    public function syncCart(Request $request)
    {
        $userId = 1;
        //$userId = $user->id;
        // // Validate incoming cart data
        $validated = $request->validate([
            'cart' => 'required|array',
            'cart.*.cartId' => 'required|numeric',
            'cart.*.name' => 'required|string',
            'cart.*.price' => 'required|numeric',
            'cart.*.quantity' => 'required|integer|min:1',
            'cart.*.attribute_name' => 'nullable|string',
            'cart.*.attribute_value' => 'nullable|string',
            'cart.*.image' => 'nullable|string',
        ]);

        // $cartWithUserId = array_map(function($item) use ($user) {
        //     return array_merge($item, ['user_id' => $user->id]);
        // }, $validated['cart']);

       
        // Cart::createMany($validated['cart']); // Replace with new cart

        // return response()->json(['message' => 'Cart synchronized successfully.']);

        return response()->json(['message' => 'database user successfully', 'userId' => $request->all()]);
    }
}
