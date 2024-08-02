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
        Schema::create('report_diagnostic_tests', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('title');
            $table->string('description');


            $table->uuid('report_id')->nullable();
            $table->foreign('report_id')->references('id')->on('reports')->onDelete('cascade');

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_diagnostic_tests');
    }
};
