<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Topic;
use \App\Models\Theme;
use \App\Models\Post;
use \App\Models\Reply;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Database\Eloquent\Builder;
class PostController extends Controller
{
    public function show(Topic $topic, Theme $theme, Post $post)
    {
        return Inertia::render('post', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])],
                3 => ["name" => $post->title, "route" => route('post', [$topic, $theme, $post])]
            ],


            'post' => $post->load([

                'replies' => function (Builder $query) {
                    $query->where('reply_id', null);
                    $query->with([
                        'user',
                        'replies.user',
                        'replies.replies.user',
                        'replies.replies.replies'
                    ]);

                },

            ]),
            'main_post' => $post->load('user'),
            'theme' => $theme,
            'topics' => Topic::with('themes')->get(),
            'topic' => $topic,


        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:10|max:50',
            'message' => 'required|min:10|max:500',
            'theme_id' => 'exists:themes,id',
        ]);

        Post::create([
            'title' => $request->title,
            'message' => $request->message,
            'user_id' => Auth::user()->id,
            'theme_id' => $request->theme_id,
        ]);

    }
    public static function newPosts(Request $request)
    {
        return Post::with('user', 'theme')->withCount('replies')->latest()->limit(5)->get();
    }
    public static function popularPosts(Request $request)
    {
        return Post::with('user', 'theme')->withCount('replies')->orderByDesc('replies_count')->limit(5)->get();
    }
}
