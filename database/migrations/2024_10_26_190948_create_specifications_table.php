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
        Schema::create('specifications', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('description', 400)->nullable();
            $table->timestamps(); // This creates created_at and updated_at columns
            $table->string('author_type', 191)->nullable();
            $table->unsignedBigInteger('author_id')->nullable();

            // Foreign key constraint
            $table->foreign('author_id')->references('id')->on('users')->onDelete('set null');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('ec_specification_tables', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
        });
        Schema::dropIfExists('specifications');
    }
};
