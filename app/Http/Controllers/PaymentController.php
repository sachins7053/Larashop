<?php

namespace App\Http\Controllers;

use App\Services\PhonePeService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $phonePeService;

    public function __construct(PhonePeService $phonePeService)
    {
        $this->phonePeService = $phonePeService;
    }

    public function initiatePayment(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|integer',
            'orderId' => 'required|string',
            'customerPhone' => 'required|string',
        ]);

        $data = [
            'merchantId' => $this->phonePeService->merchantId,
            'amount' => $validated['amount'],
            'orderId' => $validated['orderId'],
            'customerPhone' => $validated['customerPhone'],
        ];

        $response = $this->phonePeService->initiatePayment($data);

        return response()->json($response);
    }
}
