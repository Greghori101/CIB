<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transfer extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'enter_date',
        'enter_time',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function bed()
    {
        return $this->belongsTo(bed::class);
    }
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function request()
    {
        return $this->hasOne(TransferRequest::class);
    }

    public function shuttle_sheet()
    {
        return $this->belongsTo(ShuttleSheet::class);
    }
}
