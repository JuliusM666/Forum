<?php

use Illuminate\Support\Facades\Broadcast;
use \App\Models\User;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{firstId}.{secondId}', function ($user, $firstId, $secondId) {
    return (int) $user->id === (int) $firstId || (int) $user->id === (int) $secondId;
});

Broadcast::channel('users.online', function (User $user) {
    return ["id" => $user->id, "type" => $user->type == null ? "user" : $user->type, "name" => $user->name];
}, ['guards' => ['web', 'guest-guard']]);