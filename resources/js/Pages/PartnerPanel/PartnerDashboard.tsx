import PartnerLayout from '@/Layouts/PartnerLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
export default function PartnerDashboard() {


    return (
        <PartnerLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <Button>Profile</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PartnerLayout>
    );
}
