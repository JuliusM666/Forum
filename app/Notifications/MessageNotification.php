<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\Message;
use App\Models\User;

class MessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    private $message;
    private $isStore;
    private $sender;
    public function __construct(array $message, bool $isStore = false)
    {
        $this->message = $message;
        $this->isStore = $isStore;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if ($notifiable->email_notifications && auth()->user()->id != $this->message['sender_id'] && $this->isStore) {
            return ['mail', 'broadcast'];
        } else {
            return ['broadcast'];
        }
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Hello, ' . $notifiable->name . '  you have recieved new message.')
            ->subject('New message recieved')
            ->line('User ' . $this->message['sender']['username'] . " has sent new message to you.");
    }

    public function broadcastType(): string
    {
        return 'message';
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */

    public function toArray(object $notifiable): array
    {

        return $this->message;
    }

}
