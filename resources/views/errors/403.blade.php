
@if(!auth()->check())
    <script>
        // Automatically redirect if user is not authenticated
        window.location.href = "{{ route('login') }}";
    </script>
@endif
@extends('errors::minimal')

@section('title', __('Forbidden'))
@section('code', '403')
@section('message', __($exception->getMessage() ?: 'Forbidden'))
