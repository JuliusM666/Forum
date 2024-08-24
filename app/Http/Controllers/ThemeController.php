<?php

namespace App\Http\Controllers;
use \App\Models\Theme;
use Illuminate\Http\Request;
use \App\Models\Topic;
use Inertia\Inertia;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
class ThemeController extends Controller
{
    public function show(Topic $topic, Theme $theme)
    {
        return Inertia::render('theme', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])]
            ],
            'posts' => $theme->posts()->withCount('replies')->with('user')->
                with([
                    'replies' => function (Builder $query) {
                        $query->groupBy('post_id')->orderByDesc('replies.created_at')->with('user')->get();
                    }
                ])->get(),
            'theme' => $theme,
            'user' => Auth::user(),
            'topic' => $topic,
            'topics' => Topic::with('themes')->get(),
        ]);
    }
}
