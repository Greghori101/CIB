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
        Schema::create('prescription_medications', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('dosage');
            $table->string('quantity');
            $table->string('duration');
            $table->string('drug_route');
            $table->text('note');


            $table->uuid('prescription_id')->nullable();
            $table->foreign('prescription_id')->references('id')->on('prescriptions')->onDelete('cascade');
            $table->uuid('medication_id')->nullable();
            $table->foreign('medication_id')->references('id')->on('medications')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_medications');
    }
};
