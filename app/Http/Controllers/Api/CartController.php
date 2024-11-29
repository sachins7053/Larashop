<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\response;


class CartController extends Controller
{
    // public function index()
    // {
    //     $user = auth()->user();
    //     if ($user) {
    //         return response()->json(['error' => $user], 401);
    //     }
    //      $cartItems = Cart::where('user_id', 2)->get();
    //     return response()->json($cartItems, 200);
       
     
    // }

    // public function store(Request $request, $usercart )
    // {   
        
    //     // $userId = auth()->user();

    //     // if(!$userId){
    //     //     return response()->json(['error' => 'User not logged in'], 401);
    //     // }

    //     // $validatedData = $request->validate([
    //     //     'cart' => 'required|array',
    //     //     'cart.*.id' => 'nullable|integer',
    //     //     'cart.*.cartId' => 'required|string',
    //     //     'cart.*.name' => 'required|string',
    //     //     'cart.*.price' => 'required|numeric',
    //     //     'cart.*.quantity' => 'required|integer|min:1',
    //     //     'cart.*.image' => 'nullable|string',
    //     //     'cart.*.attribute_name' => 'nullable|string',
    //     //     'cart.*.attribute_value' => 'nullable|string',
    //     // ]);

    //     // Remove old cart entries for the user
    //     // Cart::where('user_id', $userId)->delete();

    //     // Save the new cart items
    //     // foreach ($validatedData['cart'] as $item) {
    //     //     Cart::create([
    //     //         'user_id' => 2,
    //     //         'cart_id' => $item['cartId'],
    //     //         'name' => $item['name'],
    //     //         'price' => $item['price'],
    //     //         'quantity' => $item['quantity'],
    //     //         'image' => $item['image'] ?? null,
    //     //         'attribute_name' => $item['attribute_name'] ?? null,
    //     //         'attribute_value' => $item['attribute_value'] ?? null,
    //     //     ]);
        
    //     return response()->json(['message' => 'Cart updated successfully', 'cart' => $usercart], 200);
    // // }

    // }

    // public function clearCart()
    // {
    //     $user = auth()->user();
    //     Cart::where('user_id', $user->id)->delete();
    //     return response()->json(['message' => 'Cart cleared successfully']);
    // }  
    
    // public function removeCartItem($userid , $itemId){
    //     // $cart = Cart::where('user_id', $userid)->orWhere('id', $itemId)->delete();

    //     return response()->json(['message' => 'user cart delated']);
    //     }
}
