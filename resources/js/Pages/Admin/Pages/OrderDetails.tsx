import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useForm, usePage, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, BellRing, Check } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormEventHandler } from "react"
import InputError from "@/components/InputError"
import {toast} from "@/hooks/use-toast"
import { useState } from "react"

export default function OrderDetails() {
    const currency:any = usePage().props.env
    const  order:any  = usePage().props.order
    const { data, setData, put, processing, errors, } = useForm({
        status: ''
    });

    const [status, setStatus] = useState(data.status || order.status || "pending");
    console.log('Order',order)
    console.log('OrderData',{order})

    const handleChangeStatus :FormEventHandler = (e:any) => {
        e.preventDefault();
        setData('status', e.target.value); 
        
        put(route('order.statusChange', {id: order.id}), {
            onFinish: () => { 
              
             
              toast({
                variant: "success",
                title: "Order Status Has Been Updated",
              })
      
      
            },
        })
      
    }

  return (
    <AuthenticatedLayout>
            <div className="container flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-4">
                <Card className="w-full mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Order No. #{order.id}</CardTitle>
                    <div className="flex space-x-2">
                      
                      <Link href={route('order.index')}>
                        <Button variant="outline" size="icon">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="sr-only">All orders</span>
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold">Bill To:</h3>
                        <p>{order.user.name}</p>
                        <p>{order.user?.email}</p>
                        <p>{order.user?.mobile}</p>
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
                            <TableCell className="text-right"><b>{currency}</b>{item.price}</TableCell>
                            <TableCell className="text-right"><b>{currency}</b>{item.subtotal}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex flex-col items-end">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal: <b>{currency}</b>{order.total_amount}</p>
                           {/* <p className="text-sm text-muted-foreground">Shipping:<b>{currency}</b>  0</p> */}
                      <p className="text-lg font-semibold mt-2">Total: <b>{currency}</b>{order.total_amount}</p>
                    </div>
                  </CardFooter>
                </Card>

                {/* Admin Action Area */}
                <Card className="md:w-1/3" >
                    <CardHeader>
                        <CardTitle>Admin Order Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="space-4 rounded-md border p-4">
                            <form onSubmit={handleChangeStatus}>

                           
                                <RadioGroup defaultValue={status} onChange={(e:any) => setData('status', e.target.value)}>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pending" id="pending" />
                                    <Label htmlFor="pending">Pending</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="processing" id="Processing" />
                                    <Label htmlFor="Processing">Processing</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hold" id="Hold" />
                                    <Label htmlFor="Hold">Hold</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="completed" id="Completed" />
                                    <Label htmlFor="Completed">Completed</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Cancelled" id="Cancel" />
                                    <Label htmlFor="Cancel">Cancel</Label>
                                    </div>
                                </RadioGroup>
                                <InputError message={errors.status} />
                                <Button className="mt-3" disabled={processing} variant={'dark'} >Update</Button>
                            </form>
                        </div>
                        
                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                    </Card>    
              </div>
    </AuthenticatedLayout>
  )
}
