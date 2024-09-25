<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
class isAuthor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if ($request->route()->hasParameter('post') && $request->route()->parameter('post')->user_id != Auth::user()->id) {
            return redirect(route("home"))->with("message", "Invalid action. You are not the author");
        }
        if ($request->route()->hasParameter('reply') && $request->route()->parameter('reply')->user_id != Auth::user()->id) {
            return redirect(route("home"))->with("message", "Invalid action. You are not the author");
        }
        return $next($request);


    }
}
