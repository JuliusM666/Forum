<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Reply;
use Illuminate\Support\Facades\Auth;
class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|min:5|max:500',
        ]);
        Reply::create([
            'message' => strip_tags($request->message),
            'user_id' => Auth::user()->id,
            'post_id' => $request->post_id,
            'reply_id' => $request->reply_id,
        ]);



    }
}
