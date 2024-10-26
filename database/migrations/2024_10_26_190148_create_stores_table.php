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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('email', 60)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('address', 191)->nullable();
            $table->string('country', 120)->nullable();
            $table->string('state', 120)->nullable();
            $table->string('city', 120)->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->string('logo', 191)->nullable();
            $table->string('logo_square', 255)->nullable();
            $table->string('cover_image', 191)->nullable();
            $table->string('description', 400)->nullable();
            $table->longText('content')->nullable();
            $table->string('status', 60)->default('published');
            $table->dateTime('vendor_verified_at')->nullable();
            $table->timestamps(); // This creates created_at and updated_at columns
            $table->string('zip_code', 20)->nullable();
            $table->string('company', 191)->nullable();
            $table->string('tax_id', 191)->nullable();
            $table->string('certificate_file', 191)->nullable();
            $table->string('government_id_file', 191)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
