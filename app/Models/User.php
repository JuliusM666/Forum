<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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
        'email_notifications',
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
    public function Messages()
    {
        return Message::where("sender_id", $this->id)->orWhere("reciever_id", $this->id)->latest()->get()
            ->groupBy(function (Message $message) {
                if ($message->sender_id == $this->id) {
                    return $message->sender_id . "*" . $message->reciever_id;
                } else {
                    return $message->reciever_id . "*" . $message->sender_id;
                }
            })->map(function ($message) {
                $first_message = $message->first();
                if ($first_message->sender_id == $this->id) {
                    $first_message->load('reciever');
                    $first_message['sender'] = $first_message['reciever'];
                    unset($first_message['reciever']);
                    return $first_message;
                } else {
                    return $first_message->load('sender');
                }
            })->sortByDesc('created_at')->values()->all();

    }

    public function sendPasswordResetNotification($token): void
    {
        $url = route('password.reset', ['token' => $token]);
        $this->notify(new ResetPasswordNotification($url));
    }
}
