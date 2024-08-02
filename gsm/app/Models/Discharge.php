<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discharge extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'patient_id',
        'discharge_by_doctor_id',
        'discharge_by_admin_id',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function discharge_by_admin(){
        return $this->belongsTo(DischargeByAdmin::class);
    }
    public function discharge_by_doctor(){
        return $this->belongsTo(DischargeByDocotr::class);
    }

    public function patient(){
        return $this->belongsTo(Patient::class);
    }

    
}
