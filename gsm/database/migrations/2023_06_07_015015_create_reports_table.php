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
        Schema::create('reports', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('chief_complaint');
            $table->string('hpi');
            $table->string('pmh');
            $table->string('physical_examination');
            $table->string('ad');
            $table->string('date');
            $table->string('conclusion');
            $table->string('treatment_plan');


            $table->uuid('admission_id')->nullable();
            $table->foreign('admission_id')->references('id')->on('admissions')->onDelete('cascade');
            $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->uuid('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
            
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
