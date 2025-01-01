<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

class AddCSPHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        Vite::useCspNonce();
        $contentSecurity = [
            "script-src 'self' 'nonce-" . Vite::cspNonce() . "'",
            "object-src 'none'"
        ];
        return $next($request)->withHeaders([
            'Content-Security-Policy' => implode("; ", $contentSecurity)
        ]);
    }
}
