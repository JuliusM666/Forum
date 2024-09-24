<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as ResetPasswordTrait;
use App\Notifications\ResetPasswordNotification;
class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, ResetPasswordTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_img',
        'banner_img',
        'last_seen',
        'facebook_id',
        'google_id',
        'linkedin_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function Posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
    public function Replies(): HasMany
    {
        return $this->hasMany(Reply::class);
    }
    public function Points(): HasMany
    {
        return $this->hasMany(Points::class);
    }
    public function Votes(): HasMany
    {
        return $this->hasMany(Points::class, "voter_id");
    }
    public function FallowedThemes(): HasMany
    {
        return $this->hasMany(ThemeFollower::class);
    }
    public function FallowedPosts(): HasMany
    {
        return $this->hasMany(PostFollower::class);
    }
    public function sendPasswordResetNotification($token): void
    {
        #http://127.0.0.1:8000/reset-password/f754f0b4b48b1783bd3728aa9660ee25ad0128f3dc729a8dbdc71d3f1eef65f4?email=nogojob849%40nastyx.com
        $url = route('password.reset', ['token' => $token]);

        $this->notify(new ResetPasswordNotification($url));
    }

}
