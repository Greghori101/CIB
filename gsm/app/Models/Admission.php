<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admission extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'admission_id',
        'date',
        'insurance_id',
        'profession',
        'profession_code',
        'number_support',
        'affiliate_fund',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function insurance_address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function patient(){
        return $this->belongsTo(Patient::class);
    }
    public function hospitalization(){
        return $this->belongsTo(Hospitalization::class);
    }
    public function shuttle_sheet(){
        return $this->hasOne(ShuttleSheet::class);
    }
}
