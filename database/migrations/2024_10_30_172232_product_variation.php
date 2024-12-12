<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('product_variations', function (Blueprint $table) {
            $table->id('variation_id');
            $table->foreignId('product_id')->constrained('products', 'id')->onDelete('cascade');
            // $table->decimal('price', 10, 2);
            // $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('sku')->nullable();
            // $table->string('stock')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_variations');
    }
};
