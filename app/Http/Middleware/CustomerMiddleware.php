<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;


class CustomerMiddleware extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    protected $rootView = 'app';


    public function handle(Request $request, Closure $next): Response
    {   

        if (!Auth::guard('web')->check()) {
            // Custom redirect or logic
            return redirect()->route('home');

        }
        return $next($request);
    }
}
