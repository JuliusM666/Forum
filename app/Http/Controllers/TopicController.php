<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Topic;
use Illuminate\Contracts\Database\Eloquent\Builder;
class TopicController extends Controller
{
    public static function index()
    {
        return Topic::with(
            [

                'themes' => function (Builder $query) {

                    $query->withCount('posts');



                },
                'themes.posts' => function (Builder $query) {

                    $query->groupBy('theme_id')->orderByDesc('posts.created_at')->get();


                },
                'themes.posts.user'


            ]
        );
    }
    public static function show(Topic $topic)
    {
        return self::index()->where('id', $topic->id)->get();
    }
}
