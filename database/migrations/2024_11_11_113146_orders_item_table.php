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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id(); // BIGINT AUTO_INCREMENT PRIMARY KEY
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // Foreign key to orders table
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Foreign key to products table
            $table->foreignId('variation_id')->nullable()->constrained('product_variations')->onDelete('set null'); // Foreign key to product_variations table
            $table->integer('quantity'); // Quantity of the product ordered
            $table->decimal('price', 10, 2); // Price of the product at the time of the order
            $table->decimal('subtotal', 10, 2); // Subtotal for this item (price * quantity)
            $table->timestamps(); // created_at and updated_at
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
