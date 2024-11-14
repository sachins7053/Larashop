import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from 'lucide-react'
import { FormEventHandler } from 'react';
import InputError from '@/components/InputError';
import { toast } from '@/hooks/use-toast';


export default function EditLead(){
    const leadData :any = usePage().props.lead

    const Lead = leadData[0]
    // console.log(Lead.customer_name)
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    mobile: '',
    details: '',
    image: '',
    link: '',
});

    const [images, setImages] = useState<File[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit :FormEventHandler = (e) => {
    e.preventDefault()

    post(route('leads.add'), {
      onFinish: () => { 
        
        reset('name', 'email','mobile', 'details', 'image', 'link')
        toast({
          variant: "success",
          title: "Your enquiry has been submitted",
          description: "we will connect you shortly",
        })


      },
  })


  }
  return (
    <AuthenticatedLayout 
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Add New Lead
        </h2>
    }
    >
    <Head title="Add new Lead" />

    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Add Enquiry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name"  
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required />
              <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required />
              
              <InputError message={errors.email} className='mt-2' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input 
                id="mobile" 
                type="tel" 
                placeholder="Enter your mobile number" 
                name="mobile"
                value={data.mobile}
                onChange={(e) => setData('mobile', e.target.value)}
                required />
              <InputError message={errors.mobile} className='mt-2' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-link">Enquiry Product Link</Label>
            <Input 
                id="product-link" 
                type="url" 
                placeholder="Enter the product link" 
                name="link"
                value={data.link}
                onChange={(e) => setData('link', e.target.value)}
                required />
              <InputError message={errors.link} className='mt-2' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enquiry">Enquiry Details</Label>
            <Textarea 
                id="enquiry" 
                placeholder="Enter your enquiry details"
                name="details"
                value={data.details}
                onChange={(e) => setData('details', e.target.value)}
                rows={4} />
              <InputError message={errors.details} className='mt-2' />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Upload Images</Label>
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
                <Input id="images" type="file" className="hidden" onChange={handleImageChange} multiple accept="image/*" />
              </Label>
            </div>
            {images.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">{images.length} file(s) selected</p>
              </div>
            )}
          </div>
          <Button disabled={processing} type="submit" className="w-full">Submit Enquiry</Button>
        </form>
      </CardContent>
    </Card>
    </AuthenticatedLayout>
  )
}
