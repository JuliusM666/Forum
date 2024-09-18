<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use \App\Models\Topic;
use Illuminate\Contracts\Database\Eloquent\Builder;
class TopicController extends Controller
{
    public static function index()
    {
        return Inertia::render('main', [
            'breadcrumbs' => [0 => ["name" => "Home", "route" => route('home')]],
            'topics' => Topic::with(
                [

                    'themes' => function (Builder $query) {

                        $query->withCount('posts');



                    },
                    'themes.posts' => function (Builder $query) {

                        $query->groupBy('theme_id')->orderByDesc('posts.created_at')->get();


                    },
                    'themes.posts.user'


                ]
            )->get(),



        ]);


    }
    public static function show(Topic $topic)
    {
        return self::index()->where('id', $topic->id)->get();
    }
}
