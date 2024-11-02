<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class AttributesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $attributes = [
            ['attribute_name' => 'Color'],
            ['attribute_name' => 'Size'],
            ['attribute_name' => 'Pattern'],
            // Add more attributes as needed
        ];

        DB::table('attributes')->insert($attributes);
    }
}
