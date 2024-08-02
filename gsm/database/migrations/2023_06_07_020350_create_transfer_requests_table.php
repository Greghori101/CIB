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
        Schema::create('transfer_requests', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('title');
            $table->string('reason');
            $table->string('status')->default('pending');
            $table->string('request_date');
            $table->string('transfer_date');
            $table->string('response');
            $table->string('type');

            $table->uuid('doctor_id')->nullable();
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
            $table->uuid('service_source_id')->nullable();
            $table->foreign('service_source_id')->references('id')->on('services')->onDelete('cascade');
            $table->uuid('service_destination_id')->nullable();
            $table->foreign('service_destination_id')->references('id')->on('services')->onDelete('cascade');
            $table->uuid('transfer_id')->nullable();
            $table->foreign('transfer_id')->references('id')->on('transfers')->onDelete('cascade');
            
            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfer_requests');
    }
};
