<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['reciever_id', 'sender_id', 'message'];
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, "sender_id");
    }
    public function reciever(): BelongsTo
    {
        return $this->belongsTo(User::class, "reciever_id");
    }
    public function emojis(): HasMany
    {
        return $this->hasMany(MessageEmoji::class);
    }
}
