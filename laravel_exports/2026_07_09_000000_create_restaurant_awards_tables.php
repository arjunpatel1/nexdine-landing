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
        // 1. Users Table (If it doesn't already exist in their main DB)
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('mobile')->unique();
                $table->string('name')->nullable();
                $table->enum('role', ['admin', 'owner', 'voter'])->default('voter');
                $table->string('password')->nullable();
                $table->boolean('is_verified')->default(false);
                $table->timestamps();
            });
        } else {
            // If they already have a users table, they might just need to add these columns
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'mobile')) {
                    $table->string('mobile')->unique()->after('id');
                }
                if (!Schema::hasColumn('users', 'role')) {
                    $table->enum('role', ['admin', 'owner', 'voter'])->default('voter')->after('name');
                }
                if (!Schema::hasColumn('users', 'is_verified')) {
                    $table->boolean('is_verified')->default(false)->after('password');
                }
            });
        }

        // 2. Categories Table
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });

        // 3. Restaurants Table
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('restaurant_name');
            $table->string('owner_name');
            $table->longText('logo')->nullable();
            $table->string('location');
            $table->text('address')->nullable();
            $table->text('description');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('slug')->unique();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // 4. Restaurant Categories Mapping Table
        Schema::create('restaurant_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });

        // 5. Votes Table
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique(); // Ensures one user votes only once across the system
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            // Assuming users table exists
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // 6. Winners Table
        Schema::create('winners', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('category_id');
            $table->integer('award_year');
            $table->timestamps();

            $table->unique(['category_id', 'award_year']);
            
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });

        // 7. OTP Verifications Table
        Schema::create('otp_verifications', function (Blueprint $table) {
            $table->id();
            $table->string('mobile')->index();
            $table->string('otp');
            $table->timestamp('expires_at')->useCurrent();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otp_verifications');
        Schema::dropIfExists('winners');
        Schema::dropIfExists('votes');
        Schema::dropIfExists('restaurant_categories');
        Schema::dropIfExists('restaurants');
        Schema::dropIfExists('categories');
        // We intentionally don't drop the users table entirely in down() if they already had one
    }
};
