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
        $user_id = $request->userID;
        if ($voter && $voter->id != $user_id) {
            $vote = User::find($user_id)->points()->where('points.voter_id', '=', $voter->id)->first();
            if ($vote == null) {
                Points::create(['user_id' => $user_id, 'voter_id' => $voter->id]);
            } else {
                Points::destroy($vote->id);
            }
        }

    }
    public function getVotesArray(Request $request)
    {
        $arr = array();
        foreach ($request->user()->votes as $vote) {
            $arr[$vote->user_id] = true;
        }
        return $arr;
    }
}
