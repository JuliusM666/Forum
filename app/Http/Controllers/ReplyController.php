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
use App\Notifications\PostSubscription;
class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|min:5|max:500',
        ]);
        $reply = Reply::create([
            'message' => $request->message,
            'user_id' => Auth::user()->id,
            'post_id' => $request->post_id,
            'reply_id' => $request->reply_id,
        ]);
        session()->flash("message", "Reply created successfully");
        $followers = Post::find($request->post_id)->followers;
        foreach ($followers as $follower) {
            if ($follower->user->id != Auth::user()->id) {
                $follower->user->notify(new PostSubscription($reply));
            }
        }


    }
    public function show(Topic $topic, Theme $theme, Post $post, Reply $reply)
    {
        $paginator = $reply->replies()->with([
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
                3 => ["name" => $post->title, "route" => route('post', [$topic, $theme, $post])],
                4 => ["name" => $reply->user->name, "route" => route('reply', [$topic, $theme, $post, $reply])]
            ],


            'post' => $post->load(['user' => fn(Builder $query) => $query->withCount('points')])->loadCount('followers'),
            'theme' => $theme,
            'pagination' => $paginator,
            'topics' => Topic::with('themes')->get(),
            'topic' => $topic,
            'isFollowing' => Auth::user() == null || Auth::user()->fallowedPosts()->where('post_id', $post->id)->first() == null ? false : true,
            'reply' => $reply,

        ]);
    }
    public function update(Request $request, Reply $reply)
    {
        if ($reply->is_deleted) {
            return redirect()->route('home')->with('message', "Can't update deleted reply");
        }
        $request->validate([
            'message' => 'required|min:5|max:500',
        ]);
        $reply->message = $request->message;
        $reply->is_edited = true;
        $reply->save();
        session()->flash("message", "Reply updated successfully");
    }
    public function destroy(Reply $reply)
    {
        $reply->message = "[ the message was deleted by user ]";
        $reply->is_deleted = true;
        $reply->is_edited = false;
        $reply->save();
        session()->flash("message", "Reply deleted successfully");
    }
}
