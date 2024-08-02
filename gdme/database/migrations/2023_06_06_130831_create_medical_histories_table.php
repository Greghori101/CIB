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
        Schema::create('medical_histories', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('medication');
            $table->text('treatment');
            $table->date('diagnosis_date');
            $table->text('medical_condition');

            $table->uuid('document_id')->nullable();
            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_histories');
    }
};
