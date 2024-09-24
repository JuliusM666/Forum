<?php

namespace App\Http\Controllers;

use App\Models\ThemeFollower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThemeFollowerController extends Controller
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
        $theme_id = $request->id;
        if ($user) {
            $subscription = $user->fallowedThemes()->where('theme_id', $theme_id)->first();
            if ($subscription == null) {
                ThemeFollower::create(['user_id' => $user->id, 'theme_id' => $theme_id]);
            } else {
                ThemeFollower::destroy($subscription->id);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ThemeFollower $follower)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ThemeFollower $follower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ThemeFollower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ThemeFollower $follower)
    {
        //
    }
}
