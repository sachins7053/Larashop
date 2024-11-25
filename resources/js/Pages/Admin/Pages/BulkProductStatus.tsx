import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


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
    console.log(fileUploads)

    return (
        <AuthenticatedLayout

                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bulk Product Upload Status
                    </h2>
                }
        >
            <Head title="Bulk Upload Status"/>
            <Card className="container max-w-6xl mx-auto roudned shadow my-8 p-4 pt-6">
                    <CardHeader>
                        <CardTitle>Product File Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                            <Table>
                                    <TableHeader>
                                            <TableRow>
                                            <TableHead>File Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Total Listings</TableHead>
                                            <TableHead>Successful</TableHead>
                                            <TableHead>Failed</TableHead>
                                            <TableHead>Error</TableHead>
                                            <TableHead>Uploaded At</TableHead>
                                            </TableRow>
                                        </TableHeader>
                            
                                <TableBody>
                                    {fileUploads.map((file) => (
                                        <TableRow key={file.id}>
                                            <TableCell>{file.file_name}</TableCell>
                                            <TableCell>{file.status}</TableCell>
                                            <TableCell>{file.total_listings ?? '-'}</TableCell>
                                            <TableCell>{file.successful_listings ?? '-'}</TableCell>
                                            <TableCell>{file.failed_listings ?? '-'}</TableCell>
                                            <TableCell>{file.error_message ?? '-'}</TableCell>
                                            <TableCell>{new Date(file.created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                    </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
