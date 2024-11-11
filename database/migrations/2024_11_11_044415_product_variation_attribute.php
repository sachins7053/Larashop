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
        Schema::table('product_variations', function (Blueprint $table) {
            
            $table->foreignId('attribute_id')
            ->nullable()  
            ->constrained('attributes', 'attribute_id')
            ->onDelete('set null') 
            ->after('sku');
        $table->string('attribute_value', 255)->nullable()->after('sku'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variations');
    }
};
