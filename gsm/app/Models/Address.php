<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'country',
        'state',
        'city',
        'daira',
        'street',

    ];

    protected $keyType = 'string';
    public $incrementing = false;
     
    public function addressable()
    {
        return $this->morphTo();
    }
}
