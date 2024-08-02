<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'chief_complaint',
        'hpi',
        'pmh',
        'ros',
        'physical_examination',
        'ad',
        'date',
        'conclusion',
        'treatment_plan',

    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function diagnostic_tests()
    {
        return $this->hasMany(ReportDiagnosticTest::class);
    }
}
