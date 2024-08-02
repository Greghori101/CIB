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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('email')->unique();
            $table->string('national_id')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('role');
            $table->string('firstname');
            $table->string('gender');
            $table->string('lastname');
            $table->date('birth_date');
            $table->string('birth_place');
            $table->string('phone_number');
            $table->string('password')->default(bcrypt("admin"));
            $table->rememberToken();
            
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
