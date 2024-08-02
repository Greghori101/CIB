<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedicalRecord extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [

    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function document()
    {
        return $this->hasMany(Document::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
