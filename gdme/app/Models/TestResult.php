<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestResult extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'title',
        'type',
        'summary',
        'details',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function test()
    {
        return $this->belongsTo(Test::class);
    }
    public function notes()
    {
        return $this->morphMany(TestNote::class, 'notable');
    }

    public function results()
    {
        return $this->hasMany(TestResultFile::class);
    }
}
