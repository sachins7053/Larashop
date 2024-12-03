import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FileManager from "@/components/FileManager/file-manager";

export default function MediaFile() {
  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
            File Manager
            </h2>
        }
        >
        <Head title="File Manager" />

        <div className='max-w-7xl mt-2 mx-auto bg-white rounded shadow p-4'>
            <FileManager />
        </div>
    </AuthenticatedLayout>
  )
}
