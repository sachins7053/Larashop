<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {   
        $user = auth()->user();
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'shipping_address' => 'required|string',
            'billing_address' => 'required|string',
            'payment_method' => 'required|in:cash_on_delivery,credit_card,paypal,bank_transfer',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.variation_id' => 'nullable|exists:product_variations,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

    
        $totalAmount = 0;
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            $price = $item['variation_id'] ? $product->variations()->find($item['variation_id'])->price : $product->price;
            $totalAmount += $price * $item['quantity'];
        }

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'total_amount' => $totalAmount,
            'shipping_address' => $request->shipping_address,
            'billing_address' => $request->billing_address,
            'payment_method' => $request->payment_method,
        ]);

        // Create order items
        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'variation_id' => $item['variation_id'] ?? null,
                'quantity' => $item['quantity'],
                'price' => $item['variation_id'] ? $product->variations()->find($item['variation_id'])->price : $product->price,
                'subtotal' => ($item['variation_id'] ? $product->variations()->find($item['variation_id'])->price : $product->price) * $item['quantity'],
            ]);
        }

        return response()->json($order, 201);
    }

    // Retrieve all orders
    public function index()
    {
        $orders = Order::with('orderItems')->get();
        return response()->json($orders);
    }

    // Retrieve a specific order
    public function show($id)
    {
        $order = Order::with('orderItems')->findOrFail($id);
        return response()->json($order);
    }

    // Update an existing order
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,completed,cancelled',
            'shipping_address' => 'sometimes|required|string',
            'billing_address' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order = Order::findOrFail($id);
        $order->update($request->only('status', 'shipping_address', 'billing_address'));

        return response()->json($order);
    }

    // Delete an order
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully.']);
    }
}
