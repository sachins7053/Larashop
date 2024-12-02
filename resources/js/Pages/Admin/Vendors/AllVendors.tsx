import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table,  TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { usePage, Link } from '@inertiajs/react'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { Inertia } from '@inertiajs/inertia'
import Paginations from "@/components/Pagination"


const AllVendors = ({vendors}:any) => {

    const [vendorsData , setVendors] =useState(vendors.data)
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (page:any) => {
   
        Inertia.get(`/admin/vendors?page=${page}`);
        
       
      };
  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
           All Vendors
        </h2>
    }
>

    <Card className='max-w-7xl mt-2 mx-auto p-4'>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Gst Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorsData.map((vendor:any) => (
              <TableRow key={vendor.vendorid}>
                <TableCell><b>{vendor.business_name}</b></TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell> {vendor.gst_number}  </TableCell>
                <TableCell>{new Date(vendor.created_at).toLocaleDateString()} {new Date(vendor.created_at).toLocaleTimeString()}</TableCell>
                <TableCell>
                <Badge variant={vendor.status == "0" ? "success" : vendor.status == "1" ? "outline" : vendor.status == "2" ? "warning"  :  "destructive" }>
                        {vendor.status == "0" ? "Pending" : vendor.status == "1" ? "Active" : vendor.status == "2" ? "Temparary Ban"  :  "Banned" }
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={route('vendor.show', {id: vendor.id} )} className="text-blue-600 hover:underline">
                    <Eye className='w-5 pointer-events-auto'/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>

      <Paginations
                totalItems={vendors.total}        // Total number of items (from backend)
                itemsPerPage={vendors.per_page}    // Number of items per page
                currentPage={currentPage}         // Current page number
                onPageChange={handlePageChange}   // Handle page change
            />
        </CardFooter>
    </Card>
</AuthenticatedLayout>
  )
}

export default AllVendors