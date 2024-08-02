<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'type',
        'tax',
        'total',
        'total_amount',
        'patient_id'
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function reciept()
    {
        return $this->hasOne(Reciept::class);
    }
    public function services()
    {
        return $this->hasMany(InvoiceServices::class);
    }
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function discharge_by_admin()
    {
        return $this->hasOne(DischargeByAdmin::class);
    }
}
