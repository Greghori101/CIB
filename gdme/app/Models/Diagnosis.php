<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Diagnosis extends Model
{
    use HasFactory,HasUuids,SoftDeletes;
    protected $fillable = [
        'diagnosis',

    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function document(){
        return $this->belongsTo(Document::class);
    }
}
