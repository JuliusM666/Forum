<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'message', 'user_id', 'theme_id'];
    public function Theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function Replies(): HasMany
    {
        return $this->hasMany(Reply::class);
    }
}
