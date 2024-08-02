<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hospitalization extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'date',
        'time',
        'service_id' ,
            'patient_id' ,
            'doctor_id' ,
            'nurse_id',
            'bed_id',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function nurse()
    {
        return $this->belongsTo(Nurse::class);
    }
    public function bed(){
        return $this->belongsTo(Bed::class);
    }
    public function admission(){
        return $this->hasOne(Admission::class);
    }
    public function shuttle_sheet(){
        return $this->hasOne(ShuttleSheet::class);
    }
}
