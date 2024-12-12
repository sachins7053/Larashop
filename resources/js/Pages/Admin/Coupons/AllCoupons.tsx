import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table,  TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { usePage, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { Inertia } from '@inertiajs/inertia'
import { Button } from '@/components/ui/button'
import Paginations from '@/components/Pagination'

export default function AllOrders({couponsData}:any) {
    const currency:any = usePage().props.env
    const [coupons , setOrders] =useState(couponsData.data)
    const [currentPage, setCurrentPage] = useState(1)
    console.log(coupons)
    

    const handlePageChange = (page:any) => {
   
        Inertia.get(`/admin/coupons?page=${page}`);
        
       
      };

  return (

      <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   All Coupons
                </h2>
            }
        >

            <Card className='max-w-7xl mt-2 mx-auto p-4'>
              <CardHeader>
                <CardTitle>Coupons</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Coupon ID</TableHead>
                      <TableHead>Coupon Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon:any) => (
                      <TableRow key={coupon.id}>
                        <TableCell>{coupon.id}</TableCell>
                        <TableCell><b>{coupon.coupon_code}</b></TableCell>
                        <TableCell><b>{coupon.coupon_type}</b>  </TableCell>
                        <TableCell><b>{coupon.discount_amount}</b>  </TableCell>
                        <TableCell>
                        <Badge variant={coupon.status == "pending" ? "outline" : coupon.status == "active" ? "success" : coupon.status == "inactive" ? "warning" :  coupon.status == "draft" ? "secondary" :  "destructive" }>
                                {coupon.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(coupon.start_date).toLocaleDateString()} </TableCell>
                        <TableCell>
                          <Link href={route('coupon.show', {id: coupon.id} )} className="text-blue-600 hover:underline">
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
                        totalItems={couponsData.total}        
                        itemsPerPage={couponsData.per_page}    
                        currentPage={currentPage}         
                        onPageChange={handlePageChange}   
                    />
                </CardFooter>
            </Card>
      </AuthenticatedLayout>
  )
}
