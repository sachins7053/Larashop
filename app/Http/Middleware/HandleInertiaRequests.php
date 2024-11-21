<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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
    public function version(Request $request): ?string
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

        return [
            ...parent::share($request),
            'env'   => env('CURRENCY'),
            'roles' => $request->user()? $request->user()->getRoleNames() : [],
            'auth' => [
                'user' => $request->user(),
                'user_id'=>auth()->user()? auth()->user()->id : null,
                 'roles' => auth()->user()? auth()->user()->getRoleNames()->pluck('name') : [],
                 'permissions' =>auth()->user()? auth()->user()->getAllPermissions()->pluck('name') : [],
            ],
        ];
    }
}
