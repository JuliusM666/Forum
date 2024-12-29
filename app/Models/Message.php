<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['reciever_id', 'sender_id', 'message'];
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, "sender_id");
    }
    public function reciever(): BelongsTo
    {
        return $this->belongsTo(User::class, "reciever_id");
    }
}
