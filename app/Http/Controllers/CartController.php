<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function getCart()
    {
        $user = auth()->user();
        $userId = $user->id;
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $cartItems = Cart::where('user_id', $userId)->get();
        if(count($cartItems) >= 1 ){
        return response()->json($cartItems, 200);
        }
        return response()->json(['Not Found'], 404);
     
    }

    public function syncCart(Request $request)
    {   
        $userId = auth()->user();

        if(!$userId){
            return response()->json(['error' => 'User not logged in'], 401);
        }

        $validatedData = $request->validate([
            'cart' => 'required|array',
            'cart.*.id' => 'nullable|integer',
            'cart.*.cartId' => 'required|string',
            'cart.*.name' => 'required|string',
            'cart.*.price' => 'required|numeric',
            'cart.*.quantity' => 'required|integer|min:1',
            'cart.*.image' => 'nullable|string',
            'cart.*.attribute_name' => 'nullable|string',
            'cart.*.attribute_value' => 'nullable|string',
        ]);

        // Remove old cart entries for the user
        Cart::where('user_id', $userId->id)->delete();

        // Save the new cart items
        foreach ($validatedData['cart'] as $item) {
            Cart::create([
                'user_id' => $userId->id,
                'cart_id' => $item['cartId'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'] ?? null,
                'attribute_name' => $item['attribute_name'] ?? null,
                'attribute_value' => $item['attribute_value'] ?? null,
            ]);
        }

        return response()->json(['message' => 'Cart updated successfully']);
    }

    public function clearCart()
    {
        $user = auth()->user();
        Cart::where('user_id', $user->id)->delete();
        return response()->json(['message' => 'Cart cleared successfully']);
    }   
}
