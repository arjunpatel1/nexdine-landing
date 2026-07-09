<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AwardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Seed Admin User
        $adminMobile = env('ADMIN_MOBILE', '9999999999');
        $adminPassword = env('ADMIN_PASSWORD', 'Admin@123');

        $adminExists = DB::table('users')->where('mobile', $adminMobile)->exists();

        if (!$adminExists) {
            DB::table('users')->insert([
                'mobile' => $adminMobile,
                'name' => 'Super Admin',
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
                'is_verified' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $this->command->info("Created admin user with mobile: {$adminMobile}");
        }

        // 2. Seed Default Categories
        $categories = [
            ['name' => 'Best Fine Dining Restaurant', 'slug' => 'best-fine-dining'],
            ['name' => 'Best Casual Dining', 'slug' => 'best-casual-dining'],
            ['name' => 'Best Cafe', 'slug' => 'best-cafe'],
            ['name' => 'Best Pub/Bar', 'slug' => 'best-pub-bar'],
            ['name' => 'Best Bakery & Dessert', 'slug' => 'best-bakery-dessert'],
            ['name' => 'Best Cloud Kitchen', 'slug' => 'best-cloud-kitchen'],
            ['name' => 'Best South Indian', 'slug' => 'best-south-indian'],
            ['name' => 'Best North Indian', 'slug' => 'best-north-indian'],
            ['name' => 'Best Biryani', 'slug' => 'best-biryani'],
            ['name' => 'Best Vegetarian', 'slug' => 'best-vegetarian'],
        ];

        $categoriesAdded = 0;
        foreach ($categories as $cat) {
            $exists = DB::table('categories')->where('slug', $cat['slug'])->exists();
            if (!$exists) {
                DB::table('categories')->insert([
                    'name' => $cat['name'],
                    'slug' => $cat['slug'],
                    'status' => 'active',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
                $categoriesAdded++;
            }
        }

        if ($categoriesAdded > 0) {
            $this->command->info("Successfully added {$categoriesAdded} default categories.");
        } else {
            $this->command->info('All default categories already exist.');
        }
    }
}
