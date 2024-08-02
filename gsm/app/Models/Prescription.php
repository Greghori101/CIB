<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'date',
    ];

    protected $keyType = 'string';
    public $incrementing = false;
    public function doctor(){
        return $this->belongsTo(Doctor::class);
    }
    public function patient(){
        return $this->belongsTo(Patient::class);
    }
    public function medications(){
        return $this->hasMany(PrescriptionMedication::class);
    }
    public function pharmacy_order(){
        return $this->hasOne(PharmacyOrder::class);
    }
    
}
