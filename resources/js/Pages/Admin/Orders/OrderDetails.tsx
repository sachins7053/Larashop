import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useForm, usePage, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, BellRing, Check, ChevronsUpDown } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormEventHandler } from "react"
import InputError from "@/components/InputError"
import {toast} from "@/hooks/use-toast"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface Vendor {
  id: string
  business_name: string
}

export default function OrderDetails({order, vendors, env, roles}:any) {
    const currency:any = env;
    // const roles:any = auth.user.roles;
    console.log(roles)
    const { data, setData, post, put, processing, errors, } = useForm({
        status: order.status,
        orderId: order.id,
        vendorId: order.order_vendor_status?.vendor_id,
        vendorOrderStatus:order.order_vendor_status?.status ,
    });

    


    console.log(order);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(data.status || order.status || "pending");

    const handleAssignVendor :FormEventHandler = (e:any) => {
      e.preventDefault();
      
      
      post(route('assignVendor'), {
          onError: () => { 
            
           
            toast({
              variant: "destructive",
              title: "There is an error in assigning vendor",
            })
    
    
          },
          onSuccess: () => { 
            
           
            toast({
              variant: "success",
              title: "Order Status Has Been Updated",
            })
    
    
          },
      })
    
  }

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
                        <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                    {order.order_vendor_status?.status == 'pending' && (
                        <div className="space-4 rounded-md border p-4">
                          <h3 className="font-semibold">Order Status:</h3>
                          <form onSubmit={handleAssignVendor}>
                                <RadioGroup defaultValue={data.vendorOrderStatus} onChange={(e:any) => setData('vendorOrderStatus', e.target.value)}>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="accepted" id="accept" />
                                    <Label htmlFor="accept">Accept</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="rejected" id="reject" />
                                    <Label htmlFor="reject">Reject</Label>
                                    </div>
                                </RadioGroup>
                                <InputError message={errors.status} />
                                <Button className="mt-3" disabled={processing} variant={'dark'} >Submit</Button>
                                </form>

                        </div>
                        )}
                        {order.order_vendor_status?.status == 'accepted' && (
                        <div className="space-4 rounded-md border p-4">
                          <h3 className="font-semibold">Change Order Status:</h3>
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
                        )}
                        { roles.includes('Admin') && (
                          
                          <div className="space-y-2">
                            <Label htmlFor="assign_vendor">Assign Vendor</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between"
                                >
                                  {vendors.find((vendor:Vendor) => data.vendorId=== vendor.id)?.business_name  || "Assign Vendor"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search Category..." />
                                  <CommandList>
                                    <CommandEmpty>No Vendor found.</CommandEmpty>
                                    <CommandGroup>
                                    
                                      {vendors.map((vendor:Vendor) => (
                                        <CommandItem
                                          key={vendor.id}
                                          value={vendor.id}
                                          onSelect={() => {
                                            setData('vendorId', vendor.id )
                                            console.log(vendor.id);

                                            setOpen(false)
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.vendorId === vendor.id ? "opacity-100" : "opacity-0"
                                            )}
                                          />
                                          {vendor.business_name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <Button onClick={handleAssignVendor} variant={'dark'} disabled={processing}> Assign Vendor</Button>


                        </div>)}
                        
                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                    </Card>    
              </div>
    </AuthenticatedLayout>
  )
}
