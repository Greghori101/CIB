<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone_number',
        'message',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = ['created_at' => 'datetime','updated_at' => 'datetime',];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function prescription()
    {
        return $this->hasOne(Prescription::class);
    }
}
