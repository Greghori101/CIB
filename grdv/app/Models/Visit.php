<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visit extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'ends_at',
        'starts_at',
        'status',
        'title',

    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'ends_at' => 'datetime',
        'starts_at' => 'datetime',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
