<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PointsController;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // return [
        //     ...parent::share($request),
        //     'auth' => [
        //         'user' => $request->user(),
        //     ],
        // ];

        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn() => $request->session()->get('message')
            ],
            'auth' => [
                'user' => $request->user() == null ? null : $request->user()->loadCount('points'),
                'votes' => $request->user() == null ? null : (new PointsController)->getVotesArray($request),
                'notifications' => $request->user() == null ? null : $request->user()->unreadNotifications,

            ],
            'verified' => $request->user() == null ? null : $request->user()->hasVerifiedEmail(),
            'sidebar' => [
                'newPosts' => (new PostController)->newPosts($request),
                'popularPosts' => (new PostController)->popularPosts($request),
                'popularUsers' => (new UserController)->popularUsers(),
            ],

        ]);
    }
}
