<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(string $query = "")
    {
        return Inertia::render('search', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => "Search", "route" => route('search', )]
            ],
            'query' => $query,
        ]);
    }
}
