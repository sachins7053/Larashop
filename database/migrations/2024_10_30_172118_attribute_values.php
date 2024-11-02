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
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id('value_id');
            $table->foreignId('attribute_id')->constrained('attributes', 'attribute_id')->onDelete('cascade'); // Make sure the constraint references the correct column
            $table->string('value');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('attribute_values');
    }
    
};
