<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Points extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'voter_id'];
    public function voter(): BelongsTo
    {
        return $this->belongsTo(User::class, "voter_id");
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
