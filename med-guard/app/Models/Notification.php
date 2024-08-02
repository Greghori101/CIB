<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'type',
        'title',
        'content',
        'displayed',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function to()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
