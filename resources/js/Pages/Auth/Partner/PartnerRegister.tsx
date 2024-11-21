import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GuestLayout from '@/Layouts/GuestLayout';
import { Head , Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Inertia } from '@inertiajs/inertia'
import InputError from '@/components/InputError'

interface FormData {
    name: string;
    email: string;
    password: string;
    mobile: string;
    document: File | null;
  }

export default function Register() {
   
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        mobile: '',
        password: '',
        document: null,
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

    post(route('partnerRegister'), {
        onFinish: () => reset('password'),
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
                        <CardTitle>Channel Partner Portal</CardTitle>
                        <CardDescription>Register or login to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                       
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                    <Label htmlFor="document">Upload Document</Label>
                                    <Input 
                                    id="document" 
                                    name="document" 
                                    type="file" 
                                    onChange={handleFileChange}  
                                    
                                    />
                                    <InputError message={errors.document} className="mt-2" />
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
