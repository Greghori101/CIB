<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'nationality',
        'blood_group',
        'family_situation',
        'person_contact',
        'person_contact_phone',
        'person_contact_wilaya',
        'height',
        'weight',
        'user_id',
        'id',
        'name',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = ['created_at' => 'datetime','updated_at' => 'datetime',];


    public function appointments(){
        return $this->hasMany(Appointment::class);
    }
    public function visits(){
        return $this->hasMany(Visit::class);
    }
    public function doctors(){
        return $this->belongsToMany(Doctor::class, 'doctor_patient', 'patient_id', 'doctor_id');
    }
}
