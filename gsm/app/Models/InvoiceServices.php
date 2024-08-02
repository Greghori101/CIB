<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceServices extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'description',
        'price',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function invoice()
    {
        return $this->belongsTo(invoice::class);
    }
   
}
