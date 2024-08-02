<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PharmacyOrder extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'order_date',
        'status',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function prescription(){
        return $this->belongsTo(Prescription::class);

    }
    public function task(){
        return $this->hasOne(Task::class);
    }
}
