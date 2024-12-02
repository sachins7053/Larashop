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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('user_id')->constrained('users', 'id'); 
            $table->string('business_name')->nullable(); 
            $table->string('gst_number', 15)->unique()->nullable(); 
            $table->string('phone_number', 15)->nullable(); 
            $table->text('address')->nullable(); 
            $table->string('gst_certificate'); 
            $table->string('trademark_certificate')->nullable(); 
            $table->string('address_proof')->nullable(); 
            $table->string('brand_name')->nullable(); 
            $table->text('additional_info')->nullable(); 
            $table->integer('status')->default(0); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
