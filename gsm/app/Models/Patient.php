<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
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
        'name',
        'status',
        'service_id'
    ];

    protected $keyType = 'string';
    public $incrementing = false;



    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function admission()
    {
        return $this->hasOne(Admission::class);
    }
    public function discharge()
    {
        return $this->hasOne(Discharge::class);
    }
    public function hospitalization()
    {
        return $this->hasOne(Hospitalization::class);
    }
    public function hospitalization_request()
    {
        return $this->hasOne(HospitalizationRequest::class);
    }
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }
    public function reports()
    {
        return $this->hasMany(Report::class);
    }
    public function shuttle_sheet()
    {
        return $this->hasOne(ShuttleSheet::class);
    }
    public function tests()
    {
        return $this->hasMany(Test::class);
    }
}
