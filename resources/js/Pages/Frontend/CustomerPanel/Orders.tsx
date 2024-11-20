import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Guest from "@/Layouts/GuestLayout"
import { usePage, Link } from "@inertiajs/react"
import { Eye } from "lucide-react"
import CustomerLayout from "./CustomerLayout"

export default function Orders() {
    const user  = usePage().props.auth.user
    const currency:any = usePage().props.env
    const  orders:any  = usePage().props.orders

    console.log(orders)
  return (
    <Guest>
      <CustomerLayout>
            
              <Card>
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
                        <Badge variant={order.order_status == "pending" ? "success" : order.order_status == "shipped" ? "default"  :  "destructive" }>
                                {order.order_status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.order_date).toLocaleDateString()} {new Date(order.order_date).toLocaleTimeString()}</TableCell>
                        <TableCell>
                          <Link href={route('orders.details', {id: order.orderid} )} className="text-blue-600 hover:underline">
                            <Eye className='w-5 pointer-events-auto'/>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    

        </CustomerLayout>
  
    </Guest>
  
  )
}
