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
        Schema::create('coupon_category', function (Blueprint $table) {
            $table->id();
            $table->foreign('coupon_id')->constrained('coupons', 'id')->onDelete('cascade');
            $table->foreign('category_id')->constrained('product_categories', 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupon_category');
    }
};
