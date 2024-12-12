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
        Schema::create('variation_attributes', function (Blueprint $table) {
            $table->id('variation_attribute_id');
            $table->foreignId('variation_id')->constrained('product_variations',  'variation_id')->onDelete('cascade');
            // $table->foreignId('value_id')->constrained('attribute_values', 'value_id')->onDelete('cascade');
            $table->string('values');
            $table->unsignedBigInteger('price');
            $table->unsignedBigInteger('sale_price');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('variation_attributes');
    }
};
