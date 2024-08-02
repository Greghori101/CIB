<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DischargeByDoctor extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'date',
        'time',
        'discharge_mode',
        'enter_reason',
        'discharge_diagnosis'
        
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    
    
    public function discharge_file(){
        return $this->hasOne(Discharge::class);
    }
}
