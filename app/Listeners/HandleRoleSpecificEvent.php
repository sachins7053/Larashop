<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleRoleSpecificEvent
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RoleSpecificEvent $event): void
    {
        // Access event properties
        $user = $event->user;
        $role = $event->role;

        if ($role === 'partner') {
            \Log::info("Handling Partner Role: " . $user->email);
            // Custom logic for partner
        } elseif ($role === 'admin') {
            \Log::info("Handling Admin Role: " . $user->email);
            // Custom logic for admin
        }
    }
}
