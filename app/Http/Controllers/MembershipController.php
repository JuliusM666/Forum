<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class MembershipController extends Controller
{
    public function index()
    {
        return Inertia::render('membership', [
            'breadcrumbs' => [
                0 => ["name" => "Home", "route" => route('home')],
                1 => ["name" => "Membership", "route" => route('membership')]
            ],
        ]);
    }
}
