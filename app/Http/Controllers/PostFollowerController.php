<?php

namespace App\Http\Controllers;

use App\Models\PostFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class PostFollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $post_id = $request->id;
        if ($user) {
            $subscription = $user->fallowedPosts()->where('post_id', $post_id)->first();
            if ($subscription == null) {
                PostFollower::create(['user_id' => $user->id, 'post_id' => $post_id]);
            } else {
                PostFollower::destroy($subscription->id);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PostFollower $postFollower)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostFollower $postFollower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostFollower $postFollower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostFollower $postFollower)
    {
        //
    }
}
