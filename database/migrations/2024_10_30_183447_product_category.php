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
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing BIGINT (20) UNSIGNED column called 'id'
            $table->string('name', 191); // Creates a VARCHAR column for 'name'
            $table->unsignedBigInteger('parent_id')->default(0); // Default value for 'parent_id'
            $table->mediumText('description')->nullable(); // Creates a nullable MEDIUMTEXT column for 'description'
            $table->string('status', 60)->default('published'); // Default value for 'status'
            $table->unsignedInteger('order')->default(0); // Default value for 'order'
            $table->string('image', 191)->nullable(); // Creates a nullable VARCHAR column for 'image'
            $table->unsignedTinyInteger('is_featured')->default(0); // Default value for 'is_featured'
            $table->timestamps(); // Creates 'created_at' and 'updated_at' columns
            $table->string('icon', 191)->nullable(); // Creates a nullable VARCHAR column for 'icon'
            $table->string('icon_image', 191)->nullable(); // Creates a nullable VARCHAR column for 'icon_image'

            // Indexes
            $table->index(['parent_id', 'status', 'created_at'], 'product_categories_parent_id_status_created_at_index');
            $table->index(['parent_id', 'status'], 'product_categories_parent_id_status_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_categories');
    }
};
