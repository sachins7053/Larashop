import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GuestLayout from '@/Layouts/GuestLayout';
import { Head , Link, useForm } from '@inertiajs/react';
import InputError from '@/components/InputError'

interface FormData {
    name: string;
    email: string;
    password: string;
    mobile: string;
    business: string;
    gst: string;
    brand: string;
    gst_certificate: File | null;
    trademark: File | null;
    address_proof: File | null;
  }

export default function Register() {
   
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        mobile: '',
        password: '',
        business: '',
        gst: '',
        brand: '',
        gst_certificate: null,
        trademark: null,
        address_proof: null,
    });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData((prev:any )=> ({ ...prev, document: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post(route('vendor.register'), {
        onFinish: () => reset(),
    });
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
  }

    return (
        <GuestLayout>
            <Head title="Register" />
                <div className="flex items-center justify-center">
                    <Card className="rounded-none shadow-none border-0 w-[400px]">
                        <CardHeader>
                        <CardTitle>Vendor Portal</CardTitle>
                        <CardDescription>Register or login to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                       
                            <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
                                <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    name="name" 
                                    value={data.name} 
                                    onChange={handleInputChange} 
                                    required 
                                    
                                />
                                <InputError message={errors.name} className="mt-2" />
                                </div>
                               
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    value={data.email} 
                                    onChange={handleInputChange} 
                                    required 
                                   
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Phone Number</Label>
                                    <Input 
                                    id="mobile" 
                                    name="mobile" 
                                    type="tel" 
                                    value={data.mobile} 
                                    onChange={handleInputChange} 
                                    required 
                                  
                                    />
                                    <InputError message={errors.mobile} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="business">Business Name</Label>
                                    <Input 
                                    id="business" 
                                    name="business" 
                                    type="text" 
                                    value={data.business} 
                                    onChange={handleInputChange} 
                                    required 
                                  
                                    />
                                    <InputError message={errors.business} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gst">GST Number</Label>
                                    <Input 
                                    id="gst" 
                                    name="gst" 
                                    type="tel" 
                                    value={data.gst} 
                                    onChange={handleInputChange} 
                                    required 
                                  
                                    />
                                    <InputError message={errors.gst} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand Name</Label>
                                    <Input 
                                    id="brand" 
                                    name="brand" 
                                    type="text" 
                                    value={data.brand} 
                                    onChange={handleInputChange} 
                                    required 
                                  
                                    />
                                    <InputError message={errors.brand} className="mt-2" />
                                </div>
                            
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Password</Label>
                                    <Input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    value={data.password} 
                                    onChange={handleInputChange} 
                                    required 
                                 
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                             
                                <div className="space-y-2">
                                    <Label htmlFor="gst_cer">Upload Gst Certificate</Label>
                                    <Input 
                                    id="gst_cer" 
                                    name="gst_certificate" 
                                    type="file" 
                                    onChange={(e:any) => setData('gst_certificate', e.target.files[0])}  
                                    required

                                    />
                                    <InputError message={errors.gst_certificate} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trademark">Upload Trandemark Certificate</Label>
                                    <Input 
                                    id="trademark" 
                                    name="trademark" 
                                    type="file" 
                                    onChange={(e:any) => setData('trademark', e.target.files[0])}  
                                    required
                                    />
                                    <InputError message={errors.trademark} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address_proof">Upload Address Proof</Label>
                                    <Input 
                                    id="address_proof" 
                                    name="address_proof" 
                                    type="file" 
                                    onChange={(e:any) => setData('address_proof', e.target.files[0])}  
                                    required
                                    />
                                    <InputError message={errors.address_proof} className="mt-2" />
                                </div>
                           
                                <div className="flex justify-between">
                               
                                <Button type="submit" disabled={processing}>Submit</Button>
                             
                                </div>
                            </form>
                            
                        </CardContent>
                    </Card>
                    </div>
        </GuestLayout>
    );
}
