<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to users table
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending'); // Order status
            $table->decimal('total_amount', 10, 2); // Total amount for the order
            $table->text('shipping_address'); // Shipping address
            $table->text('billing_address'); // Billing address
            $table->enum('payment_method', ['cash_on_delivery','credit_card', 'paypal', 'bank_transfer']); // Payment method
            $table->string('transaction_id')->unique()->nullable(); // Unique transaction identifier
            $table->text('notes')->nullable(); // Additional notes
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
