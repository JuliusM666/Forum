<?php

namespace App\Http\Controllers;

use \App\Models\Topic;
use \App\Models\Theme;
use \App\Models\Post;
use \App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Contracts\Database\Eloquent\Builder;
class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|min:5|max:500',
        ]);
        Reply::create([
            'message' => $request->message,
            'user_id' => Auth::user()->id,
            'post_id' => $request->post_id,
            'reply_id' => $request->reply_id,
        ]);



    }
    public function show(Topic $topic, Theme $theme, Post $post, Reply $reply)
    {
        return Inertia::render('post', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])],
                3 => ["name" => $post->title, "route" => route('post', [$topic, $theme, $post])],
                4 => ["name" => $reply->user->name, "route" => route('reply', [$topic, $theme, $post, $reply])]
            ],


            'post' => $reply->load(['user' => fn(Builder $query) => $query->withCount('points')]),
            'theme' => $theme,
            'pagination' => $reply->replies()->where('reply_id', null)->with([
                'user' => fn(Builder $query) => $query->withCount('points'),
                'replies.user' => fn(Builder $query) => $query->withCount('points'),
                'replies.replies.user' => fn(Builder $query) => $query->withCount('points'),
                'replies.replies.replies'
            ])->latest('replies.created_at')->paginate(10),
            'topics' => Topic::with('themes')->get(),
            'topic' => $topic,


        ]);
    }
}
