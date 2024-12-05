<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Coupon;
use App\Models\User;

class CouponController extends Controller
{
    public function applyCoupon(Request $request)
    {
        $request->validate([
            'coupon_code' => 'required|exists:coupons,coupon_code',
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array', 
            'payment_method' => 'required|string', 
        ]);

        $coupon = Coupon::where('coupon_code', $request->coupon_code)->first();
        $user = User::find($request->user_id);
        $products = Product::find($request->products);

        
        if (!$coupon->canBeUsedByUser($user)) {
            return response()->json(['error' => 'This coupon is only available for new users.'], 400);
        }

        
        if (!$coupon->isValidPaymentMethod($request->payment_method)) {
            return response()->json(['error' => 'This coupon is not valid for the selected payment method.'], 400);
        }

        
        foreach ($products as $product) {
            if (!$coupon->canBeUsedForProduct($product)) {
                return response()->json(['error' => 'Coupon cannot be used for this product.'], 400);
            }
        }

        
        $totalAmount = array_sum($products->pluck('price')->toArray());

        
        $newTotal = $coupon->applyDiscount($totalAmount);

        return response()->json([
            'message' => 'Coupon applied successfully!',
            'new_total' => $newTotal,
        ]);
    }

    public function store(Request $request)
    {
        
        $validated = $request->validate([
            'coupon_code' => 'required|unique:coupons,coupon_code',
            'coupon_type' => 'required|in:Discount,Percentage',
            'discount_amount' => 'nullable|numeric|min:0',
            'percentage_discount' => 'nullable|numeric|min:0|max:100',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
            'user_id' => 'nullable|exists:users,id',
            'usage_limit' => 'nullable|integer|min:0',
            'payment_methods' => 'nullable|array',
            'payment_methods.*' => 'nullable|string|in:credit_card,paypal', 
            'is_new_user' => 'nullable|boolean',
            'categories' => 'nullable|array', 
        ]);

        
        if ($validated['coupon_type'] == 'Discount' && isset($validated['percentage_discount'])) {
            return response()->json(['error' => 'Discount coupons cannot have percentage discount.'], 400);
        }

        if ($validated['coupon_type'] == 'Percentage' && isset($validated['discount_amount'])) {
            return response()->json(['error' => 'Percentage coupons cannot have fixed discount amount.'], 400);
        }

        
        $coupon = Coupon::create([
            'coupon_code' => $validated['coupon_code'],
            'coupon_type' => $validated['coupon_type'],
            'discount_amount' => $validated['discount_amount'] ?? null,
            'percentage_discount' => $validated['percentage_discount'] ?? null,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'user_id' => $validated['user_id'] ?? null,
            'usage_limit' => $validated['usage_limit'] ?? null,
            'payment_methods' => $validated['payment_methods'] ?? null,
            'is_new_user' => $validated['is_new_user'] ?? false,
        ]);

        
        if (!empty($validated['categories'])) {
            $categories = Category::find($validated['categories']);
            $coupon->categories()->attach($categories);
        }

        return response()->json(['message' => 'Coupon created successfully!', 'coupon' => $coupon], 201);
    }




    public function index(Request $request, $id)
    {
        
        $validated = $request->validate([
            'coupon_code' => 'required|unique:coupons,coupon_code,' . $id,
            'coupon_type' => 'required|in:Discount,Percentage',
            'discount_amount' => 'nullable|numeric|min:0',
            'percentage_discount' => 'nullable|numeric|min:0|max:100',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
            'user_id' => 'nullable|exists:users,id',
            'usage_limit' => 'nullable|integer|min:0',
            'payment_methods' => 'nullable|array',
            'payment_methods.*' => 'nullable|string|in:credit_card,paypal',
            'is_new_user' => 'nullable|boolean',
            'categories' => 'nullable|array', 
        ]);
        
        if ($validated['coupon_type'] == 'Discount' && isset($validated['percentage_discount'])) {
            return response()->json(['error' => 'Discount coupons cannot have percentage discount.'], 400);
        }

        if ($validated['coupon_type'] == 'Percentage' && isset($validated['discount_amount'])) {
            return response()->json(['error' => 'Percentage coupons cannot have fixed discount amount.'], 400);
        }
        
        $coupon = Coupon::findOrFail($id);
      
        $coupon->update([
            'coupon_code' => $validated['coupon_code'],
            'coupon_type' => $validated['coupon_type'],
            'discount_amount' => $validated['discount_amount'] ?? null,
            'percentage_discount' => $validated['percentage_discount'] ?? null,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'] ?? null,
            'user_id' => $validated['user_id'] ?? null,
            'usage_limit' => $validated['usage_limit'] ?? null,
            'payment_methods' => $validated['payment_methods'] ?? null,
            'is_new_user' => $validated['is_new_user'] ?? false,
        ]);
       
        if (!empty($validated['categories'])) {
            $categories = Category::find($validated['categories']);
            $coupon->categories()->sync($categories); 
        }

        return response()->json(['message' => 'Coupon updated successfully!', 'coupon' => $coupon], 200);
    }
}
