<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedicalRecordSummary extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'from',
        'to'
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function records()
    {
        return $this->hasMany(ServiceRecord::class);
    }
    public function patient()
    {
        return $this->belongsTo(MedicalRecord::class);
    }
}
