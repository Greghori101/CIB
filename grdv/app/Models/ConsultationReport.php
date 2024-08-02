<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsultationReport extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'date',
        'symptoms',
        'diagnosis',

    ];

    protected $keyType = 'string';
    public $incrementing = false;


    protected $casts = ['created_at' => 'datetime','updated_at' => 'datetime',];

    public function patient(){
        return $this->belongsTo(Patient::class); 
    }
    public function doctor(){
        return $this->belongsTo(Doctor::class); 
    }
    public function medications(){
        return $this->hasMany(PrescriptionMedication::class);
    }
}
