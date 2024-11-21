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

export default function AllOrders() {
    const currency:any = usePage().props.env
    const ordersData:any = usePage().props.orders
    const [orders , setOrders] =useState(ordersData.data)
    const [currentPage, setCurrentPage] = useState(1)
    console.log(ordersData)
    

    const handlePageChange = (page:any) => {
   
        Inertia.get(`/admin/orders?page=${page}`);
        
       
      };

  return (

      <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   All Orders
                </h2>
            }
        >

            <Card className='max-w-7xl mt-2 mx-auto p-4'>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order:any) => (
                      <TableRow key={order.orderid}>
                        <TableCell>{order.orderid}</TableCell>
                        <TableCell><b>{order.username}</b></TableCell>
                        <TableCell><b>{currency} </b> {Number(order.total_amount).toFixed()}  </TableCell>
                        <TableCell>
                        <Badge variant={order.order_status == "pending" ? "success" : order.order_status == "processing" ? "outline" : order.order_status == "hold" ? "warning"  :  "destructive" }>
                                {order.order_status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.order_date).toLocaleDateString()} {new Date(order.order_date).toLocaleTimeString()}</TableCell>
                        <TableCell>
                          <Link href={route('order.show', {id: order.orderid} )} className="text-blue-600 hover:underline">
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
                        totalItems={ordersData.total}        // Total number of items (from backend)
                        itemsPerPage={ordersData.per_page}    // Number of items per page
                        currentPage={currentPage}         // Current page number
                        onPageChange={handlePageChange}   // Handle page change
                    />
                </CardFooter>
            </Card>
      </AuthenticatedLayout>
  )
}
