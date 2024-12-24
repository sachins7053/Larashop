import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia'
import { PageProps } from '@/types';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";

interface UserActivity {
    id: number;
    source: string | null;
    landing_page: string | null;
    activity: string | null;
    location: string | null;
    time: string | null;
    created_at: string;
}

interface activities {
        data: UserActivity[];
        links: { url: string | null; label: string; active: boolean }[];
    };

   interface filters {
        source?: string;
        landing_page?: string;
        location?: string;
        date_from?: string;
        date_to?: string;
    };

export default function UserActivity({activities, filters}:PageProps<{activities:activities; filters:filters}>) {

    const [filterState, setFilterState] = useState({
        source: filters.source || "",
        landing_page: filters.landing_page || "",
        location: filters.location || "",
        date_from: filters.date_from || "",
        date_to: filters.date_to || "",
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterState({ ...filterState, [name]: value });
    };

    const applyFilters = () => {
        // Inertia.visit('/new-url', { param1: 'value1', param2: 'value2' }});
        router.get("/admin/analytics", filterState, { preserveState: true });
    };

    const resetFilters = () => {
        setFilterState({
            source: "",
            landing_page: "",
            location: "",
            date_from: "",
            date_to: "",
        });
        router.get("/admin/user-activities", {}, { preserveState: true });
    };

    return (
        <Authenticated 
        
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                User Activities
            </h2>
        }
        >
            <Head title="User Activities" />
        <div className="p-6 bg-white rounded shadow">

            {/* Filters */}
            <div className="mb-4 p-4 border rounded bg-gray-100">
                <h2 className="font-bold mb-2">Filters</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="source"
                        value={filterState.source}
                        onChange={handleFilterChange}
                        placeholder="Source"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="landing_page"
                        value={filterState.landing_page}
                        onChange={handleFilterChange}
                        placeholder="Landing Page"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="location"
                        value={filterState.location}
                        onChange={handleFilterChange}
                        placeholder="Location"
                        className="p-2 border rounded"
                    />
                    <input
                        type="date"
                        name="date_from"
                        value={filterState.date_from}
                        onChange={handleFilterChange}
                        placeholder="Date From"
                        className="p-2 border rounded"
                    />
                    <input
                        type="date"
                        name="date_to"
                        value={filterState.date_to}
                        onChange={handleFilterChange}
                        placeholder="Date To"
                        className="p-2 border rounded"
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <Button
                        variant={'dark'}
                        onClick={applyFilters}
                        className="px-4 py-2 rounded"
                    >
                        Apply Filters
                    </Button>
                    <Button
                    variant={'secondary'}
                        onClick={resetFilters}
                        className="px-4 py-2 bg-white rounded"
                    >
                        Reset Filters
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Source</th>
                        <th className="border border-gray-300 px-4 py-2">Landing Page</th>
                        <th className="border border-gray-300 px-4 py-2">Location</th>
                        <th className="border border-gray-300 px-4 py-2">Time</th>
                        <th className="border border-gray-300 px-4 py-2">Logged At</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.data.map((activity) => (
                        <tr key={activity.id}>
                            <td className="border border-gray-300 px-4 py-2">{activity.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{activity.source || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{activity.landing_page || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{activity.location || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{activity.time || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{activity.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                <ul className="flex justify-center space-x-2">
                    {activities.links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.url || "#"}
                                className={`px-4 py-2 border rounded ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-black"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </Authenticated>
    );
};