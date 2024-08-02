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
        Schema::create('tests', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('title');
            $table->string('type');
            $table->date('request_date');
            $table->date('expected_result_date');

            $table->uuid('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
           $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('doctors')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tests');
    }
};
