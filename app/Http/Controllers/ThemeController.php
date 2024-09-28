<?php

namespace App\Http\Controllers;
use \App\Models\Theme;
use \App\Models\Reply;
use \App\Models\Post;
use Illuminate\Http\Request;
use \App\Models\Topic;
use Inertia\Inertia;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
class ThemeController extends Controller
{
    public function show(Topic $topic, Theme $theme, Request $request)
    {
        $sortBy = $request->query('sortBy') == null ? "creationDate" : $request->query('sortBy');
        $posts = $theme->posts()->with('user', )->withCount('replies')->get();
        $replies = Reply::selectRaw('t.*')->fromRaw('(SELECT * FROM replies ORDER BY created_at DESC) t')
            ->groupBy('t.post_id')->with('user')->whereIn('t.post_id', $theme->posts()->select('id'))
            ->get()->keyBy('post_id');
        foreach ($posts as $post) {
            $post["pages"] = $post->replies()->where('reply_id', null)->paginate(10)
                ->setPath(route('post', [$topic->id, $theme->id, $post->id]));
            if (array_key_exists($post['id'], $replies->toArray(), )) {
                $post['reply'] = $replies[$post['id']];
            }
        }
        $posts = $this->sortPosts($posts, $sortBy);
        $paginator = $posts->paginate(10);
        $paginator = $paginator->onEachSide($paginator->lastPage());
        return Inertia::render('theme', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])]
            ],
            'theme' => $theme->loadCount('followers'),
            'topic' => $topic,
            'pagination' => $paginator,
            'topics' => Topic::with('themes')->get(),
            'isFollowing' => Auth::user() == null || Auth::user()->fallowedThemes()->where('theme_id', $theme->id)->first() == null ? false : true,
            'sort' => [
                "currentSort" => $sortBy,
                "links" => [
                    "creationDate" => route('theme', [$topic, $theme, "sortBy" => "creationDate"]),
                    "title" => route('theme', [$topic, $theme, "sortBy" => "title"]),
                    "answers" => route('theme', [$topic, $theme, "sortBy" => "answers"]),
                    "latestAnswers" => route('theme', [$topic, $theme, "sortBy" => "latestAnswers"]),
                    "views" => route('theme', [$topic, $theme, "sortBy" => "views"]),
                ]
            ]
        ]);
    }
    private function sortPosts($posts, string $sortBy)
    {
        switch ($sortBy) {
            case "creationDate":
                return $posts->sortByDesc('created_at');
            case "title":
                return $posts->sortByDesc('title');
            case "latestAnswers":
                return $posts->sortByDesc('reply.created_at');
            case "answers":
                return $posts->sortByDesc('replies_count');
            case "views":
                return $posts->sortByDesc('views');
        }
    }
}
