<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'sachin',
            'email' => 'Admin@gmail.com',
            'email_verified_at' => now(),
            'password' => '$2y$12$aASMqlMTJv3pIimzdkUC8OnEef3qXchbVc9rJBj1l/283NqVQHeIS',
            'remember_token' => Str::random(10),
        ])->assignRole('admin');
    }
}
