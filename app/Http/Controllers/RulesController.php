<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class RulesController extends Controller
{
    public function index()
    {
        return Inertia::render('rules', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => "Rules", "route" => route('rules')]
            ],
        ]);
    }
}
