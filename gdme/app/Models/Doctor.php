<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'id',
        'specialization',
        'user_id',
        'name',
    ];

    protected $keyType = 'string';
    public $incrementing = false;
}
