<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'number',
        'nb_bed',
        'name',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function beds()
    {
        return $this->hasMany(Bed::class);
    }
}
