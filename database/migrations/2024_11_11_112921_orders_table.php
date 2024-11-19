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
            $table->id(); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->enum('status', ['cart','pending', 'completed', 'cancelled'])->default('pending');
            $table->string('coupon_code')->nullable(); 
            $table->decimal('discount_amount', 10, 2)->default(0.00); 
            $table->decimal('total_amount', 10, 2); 
            $table->text('shipping_address'); 
            $table->text('billing_address'); 
            $table->enum('payment_method', ['cash_on_delivery','credit_card', 'paypal', 'bank_transfer']); 
            $table->string('transaction_id')->unique()->nullable(); 
            $table->text('notes')->nullable(); 
            $table->timestamps(); 
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
