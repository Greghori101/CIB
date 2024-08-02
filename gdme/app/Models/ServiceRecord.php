<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceRecord extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'time',
        'date',
        'title',
        'summary',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function medical_record()
    {
        return $this->belongsTo(MedicalRecord::class);
    }
    public function doctor_provider()
    {
        return $this->belongsTo(Doctor::class);
    }
}
