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
        Schema::create('bulk_file_upload', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed']);
            $table->integer('total_listings')->nullable();
            $table->integer('successful_listings')->nullable();
            $table->integer('failed_listings')->nullable();
            $table->text('error_message')->nullable();
            $table->text('error_codes')->nullable();
            $table->text('error_log')->nullable();
            $table->text('processded_listings')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulk_file_upload');
    }
};
