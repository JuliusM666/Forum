<?php

namespace App\Http\Controllers;
use \App\Models\Theme;
use \App\Models\Reply;
use Illuminate\Http\Request;
use \App\Models\Topic;
use Inertia\Inertia;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
class ThemeController extends Controller
{
    public function show(Topic $topic, Theme $theme)
    {
        $posts = $theme->posts()->with('user', )->withCount('replies')->latest()->get();
        $replies = Reply::selectRaw('t.*')->fromRaw('(SELECT * FROM replies ORDER BY created_at DESC) t')
            ->groupBy('t.post_id')->with('user')->whereIn('t.post_id', $theme->posts()->select('id'))
            ->get()->keyBy('post_id');
        foreach ($posts as $post) {
            if (array_key_exists($post['id'], $replies->toArray(), )) {
                $post['reply'] = $replies[$post['id']];
            }
        }

        return Inertia::render('theme', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])]
            ],
            'theme' => $theme->loadCount('followers'),
            'topic' => $topic,
            'pagination' => $posts->paginate(10),
            'topics' => Topic::with('themes')->get(),
            'isFollowing' => Auth::user() == null || Auth::user()->subscriptions()->where('theme_id', $theme->id)->first() == null ? false : true
        ]);
    }
    private function getLatestReply($postID)
    {

    }
}
