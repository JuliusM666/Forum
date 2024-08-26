<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;
use \App\Models\Points;
use Illuminate\Support\Facades\Auth;
class PointsController extends Controller
{

    public function store(Request $request)
    {

        $voter = Auth::user();
        $user = $request->user['id'];
        if (Auth::user() && $voter->id != $user) {
            $vote = User::find($user)->points()->where('points.voter_id', $voter->id)->first();

            if ($vote == null) {
                Points::create(['user_id' => $user, 'voter_id' => $voter->id]);
            } else {
                Points::destroy($vote->id);
            }
        }

    }
}
