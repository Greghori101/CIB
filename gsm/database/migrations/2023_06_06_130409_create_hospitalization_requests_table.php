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
        Schema::create('hospitalization_requests', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('date');
            $table->string('time');
            $table->string('status')->default('pending');
            $table->string('response')->nullable();

            $table->uuid('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
            $table->uuid('service_id')->nullable();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->uuid('nurse_id')->nullable();
            $table->foreign('nurse_id')->references('id')->on('nurses')->onDelete('cascade');
            $table->uuid('bed_id')->nullable();
            $table->foreign('bed_id')->references('id')->on('beds')->onDelete('cascade');
            
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitalization_requests');
    }
};
