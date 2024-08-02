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
        Schema::create('discharges', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();

            $table->uuid('discharge_by_admin_id')->nullable();
            $table->foreign('discharge_by_admin_id')->references('id')->on('discharge_by_admins')->onDelete('cascade');
            $table->uuid('patient_id')->nullable();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
           $table->uuid('discharge_by_doctor_id')->nullable();
            $table->foreign('discharge_by_doctor_id')->references('id')->on('discharge_by_doctors')->onDelete('cascade');
            
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discharges');
    }
};
