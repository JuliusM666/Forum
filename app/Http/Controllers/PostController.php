<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Topic;
use \App\Models\Theme;
use \App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Database\Eloquent\Builder;
use App\Notifications\ThemeSubscription;
class PostController extends Controller
{
    public function show(Topic $topic, Theme $theme, Post $post)
    {
        $paginator = $post->replies()->where('reply_id', null)->with([
            'user' => fn(Builder $query) => $query->withCount('points'),
            'replies.user' => fn(Builder $query) => $query->withCount('points'),
            'replies.replies.user' => fn(Builder $query) => $query->withCount('points'),
            'replies.replies.replies'
        ])->orderBy('replies.created_at')->get()->paginate(10);
        $paginator = $paginator->onEachSide($paginator->lastPage());
        return Inertia::render('post', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => $topic->title, "route" => route('topic', $topic)],
                2 => ["name" => $theme->title, "route" => route('theme', [$topic, $theme])],
                3 => ["name" => $post->title, "route" => route('post', [$topic, $theme, $post])]
            ],


            'post' => $post->load(['user' => fn(Builder $query) => $query->withCount('points')])->loadCount('followers'),
            'theme' => $theme,
            'pagination' => $paginator,
            'topics' => Topic::with('themes')->get(),
            'topic' => $topic,
            'isFollowing' => Auth::user() == null || Auth::user()->fallowedPosts()->where('post_id', $post->id)->first() == null ? false : true,

        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:10|max:50',
            'message' => 'required|min:10|max:500',
            'theme_id' => 'exists:themes,id',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'message' => $request->message,
            'user_id' => Auth::user()->id,
            'theme_id' => $request->theme_id,
        ]);
        session()->flash("message", "Post created successfully");
        $followers = Theme::find($request->theme_id)->followers;
        foreach ($followers as $follower) {
            if ($follower->user->id != Auth::user()->id) {
                $follower->user->notify(new ThemeSubscription($post));
            }
        }

    }
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('home')->with("message", "Post deleted successfully");
    }
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'message' => 'required|min:10|max:500',
        ]);
        $post->message = $request->message;
        $post->is_edited = true;
        $post->save();
        $request->session()->flash("message", "Post updated successfully");

    }

    public static function newPosts(Request $request)
    {
        return Post::with('user', 'theme')->withCount('replies')->latest()->limit(5)->get();
    }
    public static function popularPosts(Request $request)
    {
        return Post::with('user', 'theme')->withCount('replies')->orderByDesc('replies_count')->limit(5)->get();
    }
    public static function latestPosts()
    {
        return Post::selectRaw('posts.*')->fromRaw('(SELECT * FROM posts ORDER BY created_at DESC) posts')
            ->groupBy('posts.theme_id')->with('user')
            ->get();
    }
}
