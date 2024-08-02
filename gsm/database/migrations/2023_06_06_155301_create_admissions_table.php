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
        Schema::create('admissions', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('admission_id');
            $table->date('date');
            $table->string('insurance_id');
            $table->string('profession');
            $table->string('profession_code');
            $table->string('number_support');
            $table->string('affiliate_fund');


            $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->uuid('hospitalization_id')->nullable();
            $table->foreign('hospitalization_id')->references('id')->on('hospitalizations')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
