<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reciept extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'date',
        'total_amount',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
