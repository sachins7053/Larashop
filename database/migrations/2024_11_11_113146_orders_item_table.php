<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id('order_item_id');
            $table->foreignId('order_id')->constrained('orders', 'id')->onDelete('cascade'); 
            $table->foreignId('product_id')->constrained('products', 'id'); 
            $table->foreignId('variation_id')->nullable()->constrained('product_variations', 'variation_id'); 
            $table->integer('quantity'); 
            $table->decimal('price', 10, 2); 
            $table->decimal('subtotal', 10, 2); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
