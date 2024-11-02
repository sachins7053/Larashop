<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class AttributeValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $attributeValues = [
            // Color Values
            ['attribute_id' => 1, 'value' => 'Red'],
            ['attribute_id' => 1, 'value' => 'Yellow'],
            ['attribute_id' => 1, 'value' => 'Blue'],

            // Size Values
            ['attribute_id' => 2, 'value' => 'Small'],
            ['attribute_id' => 2, 'value' => 'Medium'],
            ['attribute_id' => 2, 'value' => 'Large'],

            // Pattern Values
            ['attribute_id' => 3, 'value' => 'Tree'],
            ['attribute_id' => 3, 'value' => 'Classic'],
            ['attribute_id' => 3, 'value' => 'Striped'],
        ];

        DB::table('attribute_values')->insert($attributeValues);
    }
}
