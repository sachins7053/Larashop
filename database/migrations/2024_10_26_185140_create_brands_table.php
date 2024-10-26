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
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->mediumText('description')->nullable();
            $table->string('website', 191)->nullable();
            $table->string('logo', 191)->nullable();
            $table->string('status', 60)->default('published');
            $table->unsignedTinyInteger('order')->default(0);
            $table->unsignedTinyInteger('is_featured')->default(0);
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
