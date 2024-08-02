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
        Schema::create('patients', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('nationality');
            $table->string('family_situation');
            $table->string('person_contact');
            $table->string('person_contact_phone');
            $table->string('person_contact_wilaya');
            $table->integer('height');
            $table->integer('weight');
            $table->string('blood_group');
            $table->string('name');

            $table->uuid('user_id')->nullable();
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
