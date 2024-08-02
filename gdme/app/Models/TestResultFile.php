<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestResultFile extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'name',
        'content',
        'extension',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function test()
    {
        return $this->belongsTo(TestResult::class);
    }
}
