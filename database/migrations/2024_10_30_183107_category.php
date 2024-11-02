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
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing BIGINT (20) UNSIGNED column called 'id'
            $table->string('name', 120); // Creates a VARCHAR column for 'name'
            $table->unsignedBigInteger('parent_id')->default(0); // Default value for 'parent_id'
            $table->string('description', 400)->nullable(); // Creates a nullable VARCHAR column for 'description'
            $table->string('status', 60)->default('published'); // Default value for 'status'
            $table->unsignedBigInteger('author_id')->nullable(); // Creates a nullable BIGINT column for 'author_id'
            $table->string('author_type', 191)->default(''); // Default value for 'author_type'
            $table->string('image', 60)->nullable(); // Creates a nullable VARCHAR column for 'image'
            $table->string('icon', 60)->nullable(); // Creates a nullable VARCHAR column for 'icon'
            $table->unsignedInteger('order')->default(0); // Default value for 'order'
            $table->unsignedTinyInteger('is_featured')->default(0); // Default value for 'is_featured'
            $table->unsignedTinyInteger('is_default')->default(0); // Default value for 'is_default'
            $table->timestamps(); // Creates 'created_at' and 'updated_at' columns

            // Indexes
            $table->index('parent_id', 'categories_parent_id_index');
            $table->index('status', 'categories_status_index');
            $table->index('created_at', 'categories_created_at_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
