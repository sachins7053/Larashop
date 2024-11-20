import Guest from "@/Layouts/GuestLayout"
import { usePage, Link } from "@inertiajs/react"
import CustomerLayout from "./CustomerLayout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Printer } from 'lucide-react'
import { format } from "date-fns"
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  images: string[];
  slug: string;
}

interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  product: Product;
}

interface User {
  id: number;
  name: string;
  email: string;
  mobile: number;
}

interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: string;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  user: User;
}

interface InvoiceProps {
  order: Order;
}


export default function OrderDetails() {
    const  user  = usePage().props.auth.user
    const  currency  = usePage().props.env
    const orderData :any = usePage().props.order
  const [order, setOrder] = useState(orderData[0])

    const formatCurrency = (amount: string) => {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(parseFloat(amount))
    }

        



  return (

    <Guest>
        <CustomerLayout>
          
            <div className="container mx-auto p-4">
                <Card className="w-full max-w-4xl mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Invoice #{order.id}</CardTitle>
                    <div className="flex space-x-2">
                      
                      <Link href={route('customer.orders')}>
                        <Button variant="outline" size="icon">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="sr-only">Back to orders</span>
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold">Bill To:</h3>
                        <p>{order.user.name}</p>
                        <p>{order.user.email}</p>
                        <p>{order.billing_address}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h3 className="font-semibold">Ship To:</h3>
                        <p>{order.shipping_address}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold">Order Date:</h3>
                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h3 className="font-semibold">Payment Method:</h3>
                        <p>{order.payment_method}</p>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.order_items.map((item:any) => (
                          <TableRow key={item.order_item_id}>
                           
                            <TableCell>{item.product.name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex flex-col items-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal: {formatCurrency(order.total_amount)}</p>
                      <p className="text-sm text-muted-foreground">Shipping: {formatCurrency('0')}</p>
                      <p className="text-lg font-semibold mt-2">Total: {formatCurrency(order.total_amount)}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>

        </CustomerLayout>
    </Guest>
  )
}
