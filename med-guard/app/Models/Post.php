<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, HasUuids,SoftDeletes;
    
    protected $fillable = [
        'title',
        'summary',
        'details',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function images(){
        return $this->hasMany(Image::class);
    }

}
