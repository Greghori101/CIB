<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bed extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'bed_id',
        'status',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function room(){
        return $this->belongsTo(Room::class);
    }
}
