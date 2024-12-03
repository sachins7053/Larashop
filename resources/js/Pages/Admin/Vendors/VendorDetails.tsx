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

export default function OrderDetails({vendor}:any) {
  // console.log(vendor)
    const currency:any = usePage().props.env
    const userProps = usePage().props.auth
    // console.log(userProps)
    const { data, setData, put, processing, errors, } = useForm({
        status: ''
    });

    const [status, setStatus] = useState(data.status || vendor.status || "Pending");


    const handleChangeStatus :FormEventHandler = (e:any) => {
        e.preventDefault();

        console.log(data)
        
        put(route('vendor.edit', {id: vendor.id}), {
            onFinish: () => { 
              
             
              toast({
                variant: "success",
                title: "Vendor Status Has Been Changed",
              })
      
      
            },
        })
      
    }

  return (
    <AuthenticatedLayout
            header={
              <h2 className="text-xl font-semibold leading-tight text-gray-800">
                {vendor.Business_name} Vendor
              </h2>
          }
    >
            <div className="container flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-4">
                <Card className="w-full mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Vendor Id #{vendor.id}</CardTitle>
                    <div className="flex space-x-2">
                      
                      <Link href={route('vendor.index')}>
                        <Button variant="outline" size="icon">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="sr-only">All vendors</span>
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold">Vendor Details:</h3>
                        <p><b>Vendor Name :</b>{vendor.user?.name}</p>
                        <p><b>Vendor Email :</b>{vendor.user?.email}</p>
                        <p><b>Vendor Mobile No. :</b>{vendor.user?.mobile}</p>
                        <p><b></b>{vendor.address}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h3 className="font-semibold">Company Details:</h3>
                        <p><b>Company Name :</b>{vendor.business_name}</p>
                        <p><b>Gst No. :</b>{vendor.gst_number}</p>
                        <p><b>Brand Name :</b>{vendor.brand_name}</p>
                        <p><b>Company Phone No. :</b>{vendor.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-semibold">Joined Date:</h3>
                        <p>{new Date(vendor.created_at).toLocaleDateString()}</p>
                      </div>
                      
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">View</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendor.products?.map((item:any) => (
                          <TableRow key={item.id}>
                           
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">{ item.quantity !== null ? item.quantity : 'N/A'}</TableCell>
                            <TableCell className="text-right">{item.price !== null ? `<b>${currency}</b>${item.price}` : "N/A"}</TableCell>
                            <TableCell className="text-right"><Link href={route('product.slug', {id: item.id})} target="_blank">View</Link></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex flex-col items-end">
                    {/* <div className="text-right">
                      <p className="text-sm text-muted-foreground">Subtotal: <b>{currency}</b>{vendor.total_amount}</p>
                           {/* <p className="text-sm text-muted-foreground">Shipping:<b>{currency}</b>  0</p> */}
                      {/* <p className="text-lg font-semibold mt-2">Total: <b>{currency}</b>{vendor.total_amount}</p> */}
                    {/* </div> */} 
                  </CardFooter>
                </Card>

                {/* Admin Action Area */}
                <Card className="md:w-1/3" >
                    <CardHeader>
                        <CardTitle>Admin Vendor Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="space-4 rounded-md bvendor p-4">
                            <form onSubmit={handleChangeStatus}>

                           
                                <RadioGroup defaultValue={status} onChange={(e:any) => setData('status', e.target.value)}>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Pending" id="pending" />
                                    <Label htmlFor="pending">Pending</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Active" id="Active" />
                                    <Label htmlFor="Active">Active</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Temporary Ban" id="Temporary Ban" />
                                    <Label htmlFor="Temporary Ban">Temporary Ban</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Ban" id="Ban" />
                                    <Label htmlFor="Ban">Banned</Label>
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
