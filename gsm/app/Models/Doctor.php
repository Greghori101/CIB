<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'user_id',
        'specialization',
        'chief',
        'name',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function service(){
        return $this->belongsTo(Service::class); 
    }
    public function hospitalization(){
        return $this->hasMany(Service::class); 
    }
}
