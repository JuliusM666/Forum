<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Auth;
class NotificationController extends Controller
{
    public function destroy(DatabaseNotification $notification)
    {
        $this->authorize('delete', $notification);
        $notification->delete();
    }
    public function destroyAll()
    {
        Auth::user()->notifications()->delete();
    }
}
