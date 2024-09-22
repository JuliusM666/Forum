<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Follower extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'theme_id'];
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function Theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }
}
