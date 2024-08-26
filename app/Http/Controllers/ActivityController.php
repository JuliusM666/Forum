<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('activity', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => "Activity", "route" => route('activity')]
            ],
        ]);
    }
}
