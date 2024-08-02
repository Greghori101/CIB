<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactMessage extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone_number',
        'message',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function contact_respond()
    {
        return $this->hasOne(ContactRespond::class);
    }
}
