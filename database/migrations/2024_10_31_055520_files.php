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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('filename'); 
            $table->string('original_name'); 
            $table->string('file_type'); 
            $table->string('file_path'); 
            $table->unsignedBigInteger('size');
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('files');
    }
};
