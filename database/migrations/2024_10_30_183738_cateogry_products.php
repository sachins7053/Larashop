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
        Schema::create('cat_product', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id'); // Defines an unsigned BIGINT for category_id
            $table->unsignedBigInteger('product_id'); // Defines an unsigned BIGINT for product_id

            // Primary key for the pivot table
            $table->primary(['product_id', 'category_id']); 

            // Indexes
            $table->index('category_id', 'cat_product_category_id_index');
            $table->index('product_id', 'cat_product_product_id_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_product');
    }
};
