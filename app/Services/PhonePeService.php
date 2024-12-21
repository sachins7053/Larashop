<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PhonePeService
{
    protected $merchantId;
    protected $merchantKey;
    protected $endpoint;

    public function __construct()
    {
        $this->merchantId = env('PHONEPE_MERCHANT_ID');
        $this->merchantKey = env('PHONEPE_MERCHANT_KEY');
        $this->endpoint = env('PHONEPE_ENDPOINT');
    }

    public function initiatePayment(array $data)
    {
        $url = "{$this->endpoint}/initiate";

        $headers = [
            'Content-Type' => 'application/json',
            'X-VERIFY' => $this->generateSignature($data),
        ];

        $response = Http::withHeaders($headers)->post($url, $data);

        return $response->json();
    }

    private function generateSignature(array $data): string
    {
        $payload = json_encode($data);
        return hash_hmac('sha256', $payload, $this->merchantKey);
    }
}
