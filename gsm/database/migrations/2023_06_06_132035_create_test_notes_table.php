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
        Schema::create('test_notes', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('content');


            $table->string('notable_type')->nullable();
            $table->uuid('notable_id')->nullable();

            $table->softDeletes($column = 'deleted_at', $precision = 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_notes');
    }
};
