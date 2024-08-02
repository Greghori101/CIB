<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrescriptionMedication extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'dosage',
        'quantity',
        'duration',
        'drug_route',
        'note',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function report(){
        return $this->belongsTo(ConsultationReport::class);
    }
    
}
