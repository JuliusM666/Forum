<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Post;
use Illuminate\Notifications\Messages\BroadcastMessage;
class ThemeSubscription extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $post;
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if ($notifiable->email_notifications) {
            return ['mail', 'broadcast', 'database'];
        } else {
            return ['broadcast', 'database'];
        }

    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Hello, ' . $notifiable->name . '  you are subscribed to ' . $this->post->theme->title . ' theme.')
            ->subject('Subscription notification')
            ->line('User ' . $this->post->user->name . " has created new post " . $this->post->title)
            ->line('Click the button below to see the Post.')
            ->action('Show Post', route('post', [$this->post->theme->topic, $this->post->theme, $this->post]));
    }

    public function broadcastType(): string
    {
        return 'notification';
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'user' => $this->post->user->only(["name", "id", "user_img"]),
            'title' => 'theme subscription',
            'theme' => $this->post->theme->only(["title", "id", "topic_id"]),
            'type' => "theme_subscription",
        ];

    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            "data" => $this->toArray($notifiable)
        ]);
    }

}
