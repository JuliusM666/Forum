<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['title', 'message', 'user_id', 'theme_id', 'is_edited', 'views'];
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
    public function Followers(): HasMany
    {
        return $this->hasMany(PostFollower::class);
    }
}
