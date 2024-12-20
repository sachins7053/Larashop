import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { PageProps } from '@/types';
import {useForm} from '@inertiajs/react';



export default function AddPage() {
    const { toast } = useToast()
    const [pageStatus, setPageStatus] = useState('draft')
   

    const {data , setData, post, processing, errors} = useForm({

        title: '',
        content: '',
        type: 'default',
        status: pageStatus,

    })

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        console.log("form data",data)
        

        post(route('pages.store'),{


            onError : (errors:any) => {
                console.log(errors)

                toast({
                    variant: "destructive",
                    title: "There is an error",
                  })
            },

            onSuccess : () => {

                toast({
                    variant: "success",
                    title: "Your page has been Created",
                  })

            }, 
        }
    
    
    ) };
  

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Page
                </h2>
            }
        >
            <Head title="Add New page" />
            <Card>
                <CardContent className="container mx-auto px-4 py-8">
                    <form  className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6 p-6 bg-white rounded-lg">
                            <div>
                                <Label htmlFor="pageName">page Name </Label>
                                <Input name="name" onChange={(event) => setData('title',event.target.value)}  id="pageName" placeholder="Enter page name" />
                            </div>

                            <div>
                                <Label htmlFor="fullDescription">Full Description</Label>
                                <Textarea onChange={(event) => setData('content',event.target.value)} id="fullDescription" placeholder="Enter Page Content" className="min-h-[200px]" />
                            </div>

                        </div>

                        <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <h2 className="text-xl font-semibold mb-4">Page Status</h2>
                                <RadioGroup defaultValue="draft" onValueChange={setPageStatus}>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="draft" id="draft" />
                                    <Label htmlFor="draft">Draft</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="active" id="published" />
                                    <Label htmlFor="published">Published</Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        <Button disabled={processing} onClick={handleSubmit} type="submit" className="w-full">
                            {pageStatus ===   'draft' ? 'Save Draft' :  'Update'}
                        </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
