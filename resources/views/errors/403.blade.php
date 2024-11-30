
@if(!auth()->check())
        @if (Request::is('admin/*'))

            <script>
                // Automatically redirect if user is not authenticated
                window.location.href = "{{ route('login') }}";
            </script>
        @elseif (Request::is('partner/*'))
            <script>
                // Automatically redirect if user is not authenticated
                window.location.href = "{{ route('partnerlogin') }}";
            </script>
        @elseif (Request::is('vendor/*'))
            <script>
                // Automatically redirect if user is not authenticated
                window.location.href = "{{ route('vendorlogin') }}";
            </script>
        @else
        <a href="{{ route('login') }}" class="btn btn-primary">User Login</a>

        @endif

@endif
@extends('errors::minimal')

@section('title', __('Forbidden'))
@section('code', '403')
@section('message', __($exception->getMessage() ?: 'Forbidden'))
