<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Theme extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description'];
    public function Topic(): BelongsTo
    {

        return $this->belongsTo(Topic::class);
    }
    public function Posts(): HasMany
    {

        return $this->hasMany(Post::class);
    }
    public function Followers(): HasMany
    {
        return $this->hasMany(ThemeFollower::class);
    }

}
