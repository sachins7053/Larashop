import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  document: File | null;
}

export function VendorRegistrationComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    document: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, document: e.target.files![0] }))
    }
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Vendor Portal</CardTitle>
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
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    disabled={step < 1}
                  />
                </div>
                {step >= 2 && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                      disabled={step < 2}
                    />
                  </div>
                )}
                {step >= 3 && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      type="tel" 
                      value={formData.phoneNumber} 
                      onChange={handleInputChange} 
                      required 
                      disabled={step < 3}
                    />
                  </div>
                )}
                {step >= 4 && (
                  <div className="space-y-2">
                    <Label htmlFor="document">Upload Document</Label>
                    <Input 
                      id="document" 
                      name="document" 
                      type="file" 
                      onChange={handleFileChange} 
                      required 
                      disabled={step < 4}
                    />
                  </div>
                )}
                <div className="flex justify-between">
                  {step > 1 && <Button type="button" onClick={handlePrev}>Previous</Button>}
                  {step < 4 ? (
                    <Button type="button" onClick={handleNext}>Next</Button>
                  ) : (
                    <Button type="submit">Submit</Button>
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
  )
}