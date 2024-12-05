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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code')->unique();
            $table->enum('coupon_type', ['Discount', 'Percentage']);
            $table->decimal('discount_amount', 10, 2)->nullable(); 
            $table->decimal('percentage_discount', 5, 2)->nullable(); 
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->foreignId('user_id')->constrained('users','id')->onDelete('cascade');  
            $table->integer('usage_limit')->nullable(); 
            $table->integer('usage_count')->default(0); 
            $table->json('payment_methods')->nullable(); 
            $table->boolean('is_new_user')->default(false); 
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupon');
    }
};
