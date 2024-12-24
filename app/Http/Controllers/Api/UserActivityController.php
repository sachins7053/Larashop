<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserActivity;

class UserActivityController extends Controller
{
    public function index(Request $request)
        {
            $query = UserActivity::query();

            // Apply filters if present
            if ($request->filled('source')) {
                $query->where('source', 'LIKE', '%' . $request->source . '%');
            }

            if ($request->filled('landing_page')) {
                $query->where('landing_page', 'LIKE', '%' . $request->landing_page . '%');
            }

            if ($request->filled('location')) {
                $query->where('location', 'LIKE', '%' . $request->location . '%');
            }

            if ($request->filled('date_from')) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }

            if ($request->filled('date_to')) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }

            // Pagination
            $activities = $query->latest()->paginate(10)->withQueryString();

            return inertia('Admin/UserActivity', [
                'activities' => $activities,
                'filters' => $request->only(['source', 'landing_page', 'location', 'date_from', 'date_to']),
            ]);
        }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'source' => 'nullable|string',
            'landing_page' => 'nullable|string',
            'activity' => 'nullable|string',
            'location' => 'nullable|string',
            'time' => 'nullable',
        ]);

        UserActivity::create($validated);

        return response()->json(['message' => 'User activity logged successfully'], 201);
    }
}
