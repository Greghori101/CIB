<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'id',
        'specialization',
        'user_id',
        'name',

    ];

    protected $casts = ['created_at' => 'datetime','updated_at' => 'datetime',];


    protected $keyType = 'string';
    public $incrementing = false;

    public function service(){
        return $this->belongsTo(Service::class); 
    }
    public function patients(){
        return $this->belongsToMany(Patient::class, 'doctor_patient', 'doctor_id', 'patient_id');
    }
    public function visits(){
        return $this->hasMany(Visit::class);
    }
    public function planning(){
        return $this->hasMany(Serviceplan::class);
    }
}
