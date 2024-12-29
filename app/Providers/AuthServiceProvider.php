<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Policies\NotificationPolicy;
use App\Policies\PostPolicy;
use App\Policies\ReplyPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Auth;
use \App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        DatabaseNotification::class => NotificationPolicy::class,
        Post::class => PostPolicy::class,
        Reply::class => ReplyPolicy::class,
        User::class => UserPolicy::class,
        Message::class => MessagePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->greeting('Hello, ' . $notifiable->name . ' thank you for using our application!')
                ->subject('Verify Email Address')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', $url);

        });
        Auth::viaRequest('guest-guard', function (Request $request) {
            return User::factory()->make([
                'id' => (int) str_replace('.', '', microtime(true)),
                'type' => 'guest',
            ]);
        });
    }
}
