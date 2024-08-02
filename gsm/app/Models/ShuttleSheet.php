<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShuttleSheet extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [];

    protected $keyType = 'string';
    public $incrementing = false;

    public function admission()
    {
        return $this->belongsTo(Admission::class);
    }
    public function hospitalization()
    {
        return $this->belongsTo(Hospitalization::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function transfers()
    {
        return $this->hasMany(Transfer::class);
    }
}
