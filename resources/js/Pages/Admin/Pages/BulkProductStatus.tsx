

type FileUpload = {
    id: number;
    file_name: string;
    status: string;
    total_listings: number | null;
    successful_listings: number | null;
    failed_listings: number | null;
    error_message: string | null;
    created_at: string;
};

export default function UploadStatus({ fileUploads }: { fileUploads: FileUpload[] }) {
    return (
        <div>
            <h1 className="text-2xl font-bold">Upload Status</h1>
            <table className="min-w-full border-collapse border border-gray-200 mt-4">
                <thead>
                    <tr>
                        <th className="border border-gray-200 p-2">File Name</th>
                        <th className="border border-gray-200 p-2">Status</th>
                        <th className="border border-gray-200 p-2">Total Listings</th>
                        <th className="border border-gray-200 p-2">Successful</th>
                        <th className="border border-gray-200 p-2">Failed</th>
                        <th className="border border-gray-200 p-2">Error</th>
                        <th className="border border-gray-200 p-2">Uploaded At</th>
                    </tr>
                </thead>
                <tbody>
                    {fileUploads.map((file) => (
                        <tr key={file.id}>
                            <td className="border border-gray-200 p-2">{file.file_name}</td>
                            <td className="border border-gray-200 p-2">{file.status}</td>
                            <td className="border border-gray-200 p-2">{file.total_listings ?? '-'}</td>
                            <td className="border border-gray-200 p-2">{file.successful_listings ?? '-'}</td>
                            <td className="border border-gray-200 p-2">{file.failed_listings ?? '-'}</td>
                            <td className="border border-gray-200 p-2">{file.error_message ?? '-'}</td>
                            <td className="border border-gray-200 p-2">{new Date(file.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
