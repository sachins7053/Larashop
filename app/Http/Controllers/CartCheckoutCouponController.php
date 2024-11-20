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

    public function syncCart(Request $request, $userId)
    {   
        // $userId = auth()->user();

        // if($userId){
        //     return response()->json(['error' => 'User not logged in'], 401);
        // }

        // $validatedData = $request->validate([
        //     'cart' => 'required|array',
        //     'cart.*.id' => 'nullable|integer',
        //     'cart.*.cartId' => 'required|string',
        //     'cart.*.name' => 'required|string',
        //     'cart.*.price' => 'required|numeric',
        //     'cart.*.quantity' => 'required|integer|min:1',
        //     'cart.*.image' => 'nullable|string',
        //     'cart.*.attribute_name' => 'nullable|string',
        //     'cart.*.attribute_value' => 'nullable|string',
        // ]);

        // // Remove old cart entries for the user
        // Cart::where('user_id', $userId)->delete();

        // // Save the new cart items
        // foreach ($validatedData['cart'] as $item) {
        //     Cart::create([
        //         'user_id' => $userId,
        //         'cart_id' => $item['cartId'],
        //         'name' => $item['name'],
        //         'price' => $item['price'],
        //         'quantity' => $item['quantity'],
        //         'image' => $item['image'] ?? null,
        //         'attribute_name' => $item['attribute_name'] ?? null,
        //         'attribute_value' => $item['attribute_value'] ?? null,
        //     ]);
        // }

        return response()->json(['message' => 'Cart updated successfully']);
    }
}
