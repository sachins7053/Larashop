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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('slug', 255);
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('status', 60)->default('published');
            $table->text('images')->nullable();
            $table->text('video_media')->nullable();
            $table->string('sku', 191)->nullable();
            $table->string('material', 191)->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedTinyInteger('allow_checkout_when_out_of_stock')->default(0);
            $table->unsignedTinyInteger('with_storehouse_management')->default(0);
            $table->unsignedTinyInteger('is_featured')->default(0);
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->unsignedTinyInteger('is_variation')->default(0);
            $table->unsignedTinyInteger('sale_type')->default(0);
            $table->double('price')->nullable();
            $table->double('sale_price')->nullable();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->double('length', 8, 2)->nullable();
            $table->double('wide', 8, 2)->nullable();
            $table->double('height', 8, 2)->nullable();
            $table->double('weight', 8, 2)->nullable();
            $table->unsignedBigInteger('tax_id')->nullable();
            $table->unsignedBigInteger('views')->default(0);
            //$table->timestamp('created_at')->nullable();
            //$table->timestamp('updated_at')->nullable();
            $table->string('stock_status', 191)->default('in_stock');
            $table->unsignedBigInteger('created_by_id')->default(0);
            $table->string('created_by_type', 191)->default('Botble\\ACL\\Models\\User');
            $table->string('image', 191)->nullable();
            $table->string('product_type', 60)->default('physical');
            $table->string('barcode', 50)->nullable();
            $table->double('cost_per_item')->nullable();
            $table->unsignedTinyInteger('generate_license_code')->default(0);
            $table->unsignedInteger('minimum_order_quantity')->default(0);
            $table->unsignedInteger('maximum_order_quantity')->default(0);
            $table->unsignedTinyInteger('notify_attachment_updated')->default(0);
            $table->unsignedBigInteger('specification_table_id')->nullable();
            $table->foreignId('store_id')->constrained('vendors', 'id')->nullable();
            $table->unsignedBigInteger('approved_by')->default(0);
            $table->timestamps();

            /* Foreign key constraints
            //$table->foreign('brand_id')->references('id')->on('brands')->onDelete('set null');
            $table->foreign('tax_id')->references('id')->on('taxes')->onDelete('set null');
            $table->foreign('specification_table_id')->references('id')->on('specifications')->onDelete('set null');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('set null');
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('set null');

            */
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        /*
        Schema::table('products', function (Blueprint $table) {
        //$table->dropForeign(['brand_id']);
        $table->dropForeign(['tax_id']);
        $table->dropForeign(['specification_table_id']);
        $table->dropForeign(['store_id']);
        $table->dropForeign(['approved_by']);
    });
    */


        Schema::dropIfExists('products');
    }
};
