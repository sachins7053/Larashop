<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Reviews;

class ReviewController extends Controller
{
    public function submitReview(Request $request){


        // dd($request);
        $imagesArray = [];

        if ($request->has('images')) {            
            $images = $request->file('images');
            if ($images) {
                foreach ($images as $image) {
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs("uploads", $imageName, 'public');
                    $imagesArray[] = $path;
                }
            }
        }

        $review = Reviews::create([
            'user_id' => auth()->user()->id,
            'product_id' => $request->productId,
            'review_title' => $request->title,
            'rating' => $request->rating,
            'review' => $request->review,
            'images' => $imagesArray,
            'status' => 'pending',

        ]);

        if (!$review) {
            return redirect()->back()->with('error', 'Failed to submit the review.');
        }

        return redirect()->back()->with('success', 'Review submitted successfully!');

    }
}
