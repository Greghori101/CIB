<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Test extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'title',
        'type',
        'status',
        'request_date',
        'expected_result_date',
        'response',
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
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function notes()
    {
        return $this->morphMany(TestNote::class, 'notable');
    }
}
