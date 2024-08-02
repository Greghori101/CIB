<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'name',
        'content',
        'extension',
    ];

    protected $casts = ['created_at' => 'datetime','updated_at' => 'datetime',];


    protected $keyType = 'string';
    public $incrementing = false;

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}
