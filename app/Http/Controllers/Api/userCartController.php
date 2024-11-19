<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class userCartController extends Controller
{
    public function index(){
        return response()->json(['message' => 'user cart index']);
    }

    public function store(Request $request, $usercart){

        // $validatedData = $request->validate([
        //     'cart' => 'required|array',
        //     'cart.*.id' => 'nullable|integer',
        //     'cart.*.cart_id' => 'required|string',
        //     'cart.*.name' => 'required|string',
        //     'cart.*.price' => 'required|numeric',
        //     'cart.*.quantity' => 'required|integer|min:1',
        //     'cart.*.image' => 'nullable|string',
        //     'cart.*.attribute_name' => 'nullable|string',
        //     'cart.*.attribute_value' => 'nullable|string',
        // ]);

        foreach ($request->all() as $item) {
            Cart::create([
                'user_id' => $usercart,
                'cartId' => $item['cartId'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'] ?? null,
                'attribute_name' => $item['attribute_name'] ?? null,
                'attribute_value' => $item['attribute_value'] ?? null,
            ]);

        return response()->json(['message' => 'user cart store']);
        }
    }

    public function show($usercart, $cart){

        $cartdata = Cart::where('user_id', $cart)->get();

        return response()->json($cartdata, 200);
    }
    public function update(Request $request, $usercart){

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

        foreach ($validatedData['cart'] as $item) {
            Cart::create([
                'user_id' => $usercart,
                'cartId' => $item['cartId'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'] ?? null,
                'attribute_name' => $item['attribute_name'] ?? null,
                'attribute_value' => $item['attribute_value'] ?? null,
            ]);

        return response()->json(['message' => 'user cart updated']);
    }
}
    public function destroy($usercart , $cart){
        $cart = Cart::where('user_id', $usercart)->delete();

        return response()->json(['message' => 'user cart delated']);
        }
    public function removeCartItem($userid , $itemId){
        $cart = Cart::where('user_id', $userid)->orWhere('cartId', $itemId)->delete();

        return response()->json(['message' => 'user cart delated']);
        }
}
