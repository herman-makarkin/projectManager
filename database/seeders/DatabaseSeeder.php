<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Herman',
            'email' => 'german.makarkin@gmail.com',
            //'gender' => 'Male',
            //'age' => 33,
            'password' => bcrypt('mypassword123'),
            'email_verified_at' => time(),
        ]);

        Project::factory()
        ->count(20)
        ->hasTasks(20)
        ->create();
    }
}
