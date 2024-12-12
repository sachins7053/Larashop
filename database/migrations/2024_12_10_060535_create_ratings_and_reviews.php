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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('product_id')->constrained('products', 'id')->onDelete('cascade'); 
            $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade'); 
            $table->string('review_title');
            $table->integer('rating')->unsigned(); 
            $table->text('review');
            $table->text('images')->nullable();
            $table->enum('status', ['pending', 'active', 'reject'])->default('pending');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
