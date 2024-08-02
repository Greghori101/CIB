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
        Schema::create('shuttle_sheets', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();

            $table->uuid('admission_id')->nullable();
            $table->foreign('admission_id')->references('id')->on('admissions')->onDelete('cascade');
            $table->uuid('hospitalization_id')->nullable();
            $table->foreign('hospitalization_id')->references('id')->on('hospitalizations')->onDelete('cascade');
            $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shuttle_sheets');
    }
};
