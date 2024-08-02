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
        Schema::create('medical_record_summaries', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->date('from');
            $table->date('to');

            $table->uuid('medical_record_id')->nullable();
            $table->foreign('medical_record_id')->references('id')->on('medical_records')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_record_summaries');
    }
};
