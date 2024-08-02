<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransferRequest extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'title',
        'reason',
        'status',
        'request_date',
        'transfer_date',
        'response',
        'type'
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
    public function service_source()
    {
        return $this->belongsTo(Service::class.'service_source_id');
    }
    public function service_destination()
    {
        return $this->belongsTo(Service::class,'service_destination_id');
    }
    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }
}
