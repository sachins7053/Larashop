<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {   
        $verificationUrl = $this->verificationUrl($notifiable);
        $role = $notifiable->role; // Assuming your User model has a `role` attribute.

        $mailMessage = (new MailMessage)
            ->subject('Verify Your Email Address');

        if ($role === 'Admin') {
            $mailMessage->line('As an admin, you must verify your email to manage the platform.')
                        ->action('Verify Email', $verificationUrl);
        } elseif ($role === 'Customer') {
            $mailMessage->line('Please verify your email to access your account.')
                        ->action('Verify Email', $verificationUrl); 
        } elseif ($role === 'Agent') {
            $mailMessage->line('Please verify your email to access your account.')
                        ->action('Verify Email', $verificationUrl);
        } else {
            $mailMessage->line('Welcome! Please verify your email.')
                        ->action('Verify Email', $verificationUrl);
        }

        return $mailMessage;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
