<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reply extends Model
{
    use HasFactory;
    protected $fillable = ['reply', 'user_id', 'post_id', 'reply_id', 'message'];
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function Post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
    public function Reply(): BelongsTo
    {
        return $this->belongsTo(Reply::class);
    }
    public function Replies(): HasMany
    {
        return $this->hasMany(Reply::class);
    }
    public function store()
    {

    }
}
