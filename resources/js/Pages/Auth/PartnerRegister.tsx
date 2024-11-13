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
    const [step, setStep] = useState(1)
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

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

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
                        <CardTitle>Channer Partner Portal</CardTitle>
                        <CardDescription>Register or login to your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <Tabs defaultValue="register">
                            <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="register">Register</TabsTrigger>
                            <TabsTrigger value="login">Login</TabsTrigger>
                            </TabsList>
                            <TabsContent value="register">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    name="name" 
                                    value={data.name} 
                                    onChange={handleInputChange} 
                                    required 
                                    disabled={step < 1}
                                />
                                <InputError message={errors.name} className="mt-2" />
                                </div>
                                {step >= 2 && (
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    value={data.email} 
                                    onChange={handleInputChange} 
                                    required 
                                    disabled={step < 2}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                )}
                                {step >= 3 && (
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Phone Number</Label>
                                    <Input 
                                    id="mobile" 
                                    name="mobile" 
                                    type="tel" 
                                    value={data.mobile} 
                                    onChange={handleInputChange} 
                                    required 
                                    disabled={step < 3}
                                    />
                                    <InputError message={errors.mobile} className="mt-2" />
                                </div>
                                )}
                                {step >= 4 && (
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Password</Label>
                                    <Input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    value={data.password} 
                                    onChange={handleInputChange} 
                                    required 
                                    disabled={step < 4}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                )}
                                {step >= 5 && (
                                <div className="space-y-2">
                                    <Label htmlFor="document">Upload Document</Label>
                                    <Input 
                                    id="document" 
                                    name="document" 
                                    type="file" 
                                    onChange={handleFileChange}  
                                    disabled={step < 5}
                                    />
                                    <InputError message={errors.document} className="mt-2" />
                                </div>
                                )}
                                <div className="flex justify-between">
                                {step > 1 && <Button type="button" onClick={handlePrev}>Previous</Button>}
                                {step < 5 ? (
                                    <Button type="button" onClick={handleNext}>Next</Button>
                                ) : (
                                    <Button type="submit" disabled={processing}>Submit</Button>
                                )}
                                </div>
                            </form>
                            </TabsContent>
                            <TabsContent value="login">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input id="login-email" type="email" required />
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <Input id="login-password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full">Login</Button>
                            </form>
                            </TabsContent>
                        </Tabs>
                        </CardContent>
                    </Card>
                    </div>
        </GuestLayout>
    );
}
