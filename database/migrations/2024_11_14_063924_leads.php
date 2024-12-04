<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id'); 
            $table->string('customer_name', 100);
            $table->string('customer_email', 100);
            $table->string('mobile_no', 15);
            $table->text('address')->nullable();
            $table->text('lead_details');
            $table->string('image_url')->nullable(); 
            $table->string('link')->nullable(); 
            $table->enum('status', ['pending', 'Accept', 'reject', 'in progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high'])->default('low');
            $table->timestamps(); 
        });
    }

  
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
