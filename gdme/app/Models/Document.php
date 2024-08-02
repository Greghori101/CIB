<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'date',
        'time',
        'discharge_mode',
        'enter_reason',
        'discharge_diagnosis'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    
    public function medical_history(){
        return $this->hasMany(MedicalHistory::class);
    }
    public function tests(){
        return $this->hasMany(Test::class);
    }
    public function test_results(){
        return $this->hasMany(TestResult::class);
    }

    public function diagnosises(){
        return $this->hasMany(Diagnosis::class);

    }
    public function progress_notes(){
        return $this->hasMany(PatientProgressNote::class);
    }
    public function discharge(){
        return $this->hasOne(Discharge::class);
    }
    public function medical_record()
    {
        return $this->belongsTo(MedicalRecord::class);
    }
}
