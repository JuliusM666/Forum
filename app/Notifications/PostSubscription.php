<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Reply;
use Illuminate\Notifications\Messages\BroadcastMessage;

class PostSubscription extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $reply;
    public function __construct(Reply $reply)
    {
        $this->reply = $reply;
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
            ->greeting('Hello, ' . $notifiable->name . '  you are subscribed to ' . $this->reply->post->title . ' post.')
            ->subject('Subscription notification')
            ->line('User ' . $this->reply->user->name . " has replied in this post");
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

        $post = $this->reply->post;
        $theme = $post->theme;
        return [
            'title' => 'post subscription',
            'user' => $this->reply->user->only(["name", "id", "user_img"]),
            'post' => ["id" => $post->id, "theme_id" => $theme->id, "topic_id" => $theme->topic_id, "title" => $post->title],
            'type' => "post_subscription",
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            "data" => $this->toArray($notifiable)
        ]);
    }

}
