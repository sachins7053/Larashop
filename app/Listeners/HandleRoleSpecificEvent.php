<?php

namespace App\Listeners;
use App\Events\RoleSpecificEvent;
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

            $user->notify(new PartnerWelcomeNotification());
            \Log::info("Handling Partner Role: " . $user->email);
            // Custom logic for partner
        } elseif ($role === 'admin') {

            $user->notify(new PartnerWelcomeNotification());
            \Log::info("Handling Admin Role: " . $user->email);
            
        }
    }
}
