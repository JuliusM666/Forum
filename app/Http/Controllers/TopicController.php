<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use \App\Models\Topic;
use \App\Models\User;
use \App\Http\Controllers\PostController;
use \App\Http\Controllers\UserController;
use Illuminate\Contracts\Database\Eloquent\Builder;

class TopicController extends Controller
{
    public function index(array $params = [])
    {
        $topics = Topic::with([
            'themes' => function (Builder $query) {
                $query->withCount('posts');
            }
        ])->get();
        $posts = PostController::latestPosts();
        foreach ($topics as $topic) {
            foreach ($topic["themes"] as $theme) {
                $theme['post'] = $posts[$theme['id'] - 1];
            }
        }
        $baseParams = [
            'breadcrumbs' => [0 => ["name" => "Home", "route" => route('home')]],
            'topics' => $topics,
            'activeUsers' => User::all()->whereBetween('last_seen', [now()->subMinute(), now()])->select('id', 'name'),
            'userStatistics' => [
                'userCount' => User::all()->count(),
                'latestUser' => User::latest()->first(),
            ]
        ];

        return Inertia::render('main', array_merge($baseParams, $params));

    }
    public function show(Topic $topic)
    {

        $topic = $topic->load([
            'themes' => function (Builder $query) {
                $query->withCount('posts');
            }
        ]);

        $posts = PostController::latestPosts();
        foreach ($topic["themes"] as $theme) {
            $theme['post'] = $posts[$theme['id'] - 1];
        }
        return Inertia::render('topic', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)]
            ],
            'topic' => $topic,
            'topics' => Topic::with('themes')->get(),


        ]);

    }
}
