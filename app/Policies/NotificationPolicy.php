<?php

namespace App\Policies;

use Illuminate\Notifications\DatabaseNotification;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class NotificationPolicy
{
    public function delete(User $user, DatabaseNotification $notification): bool
    {
        return $user->id == $notification->notifiable_id;
    }

}
