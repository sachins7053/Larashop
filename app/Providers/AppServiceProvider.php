<?php

namespace App\Providers;
use App\Listeners\AgentRegisteredListener;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Events\RoleSpecificEvent;
use App\Listeners\HandleRoleSpecificEvent;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */



     protected $listen = [
        \Illuminate\Auth\Events\Registered::class => [
            \Illuminate\Auth\Listeners\SendEmailVerificationNotification::class,
        ],
        RoleSpecificEvent::class => [
            HandleRoleSpecificEvent::class,
        ],
    ];


    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'appUrl' => config('app.url'), // This will pass `APP_URL` to your frontend
           
           
        ]);

      
    }
}
