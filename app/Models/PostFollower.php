<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostFollower extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'post_id'];
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function Post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
