import {FormEventHandler, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import InputError from '@/components/InputError'

 type Category = {
    id: number;
    name: string;
    parent_id: number | null;
  };

export default function AddCoupon({coupons,categories}:any) {
    console.log("categories", categories) 
  
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [categoryInput, setCategoryInput] = useState("");
  

    const { data, setData, post, processing, errors } = useForm<{
        code: string;
        coupon_type: string;
        discount: number | null;
        description: string;
        categories: number[]; 
        limit:number | null;
        usage:number | null;
        status:string;
      }>({
        code: coupons.coupon_code,
        coupon_type: coupons.coupon_type,
        discount: null,
        description: "",
        categories: [],
        limit:null,
        usage:null,
        status:'active' 
      });

    const handleCategorySelect = (category: Category) => {
        if (!data.categories.includes(category.id)) {
          setData("categories", [...data.categories, category.id]); // Add selected category ID to the form data
        }
        setCategoryInput(""); // Clear the input field
        setFilteredCategories([]); // Hide suggestions
      };

    const handleSubmit : FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('coupon.store'),{

            onError: () => { 
            
           
                toast({
                  variant: "destructive",
                  title: "There is an error in creating coupon",
                })
        
        
              },
            onSuccess: () => {
                
                toast({
                    variant: "success",
                    title: "Your Coupon has been created",
                  })

            }

        });
    }
    
  return (
    <AuthenticatedLayout 
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Coupon
                </h2>
            }
    >
        <Head title="Add Coupon" />

        <form onSubmit={handleSubmit}>
            <Card className="max-w-7xl mx-auto mt-5 p-4">
                <CardContent className='space-y-5'>
                <div>
                    <Label htmlFor="code" className="block text-lg font-medium"> Add Coupon Code</Label>
                    <Input id="code" type="text" name="code" value={data.code} onChange={(e) => setData('code', e.target.value)} required />
                    <InputError message={errors.code} />
                </div>

                <div className='md:flex w-full gap-5'>
                    <div className='w-full'>

                        <Label htmlFor="coupon_type" className="block text-lg font-medium">Coupon Type</Label>
                        <Select
                            value={data.coupon_type}
                            onValueChange={(value) => setData("coupon_type", value)} 
                            >
                            <SelectTrigger>
                            <SelectValue placeholder="Select coupon type" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='w-full'>
                        <Label htmlFor="discount" className="block text-lg font-medium"> Discount Amount</Label>
                        <Input id="discount" type="number" name="discount" value={data.discount?.toString()} 
                            onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            setData("discount", isNaN(value) ? 0 : value); // Ensure value is a valid number
                        }} required />
                    </div>
                </div>
                
                    <div>
                        <Label htmlFor="description" className="block text-lg font-medium" > Description</Label>
                        <Textarea id="description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>

                    <div>
                    <label htmlFor="categories" className="block text-sm font-medium">
                            Categories
                            </label>
                            <div className="flex flex-wrap gap-2 mt-2">
                            {data.categories.map((categoryId) => {
                                const category = categories.find((cat:any) => cat.id === categoryId);
                                return (
                                category && (
                                    <div
                                    key={category.id}
                                    className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded"
                                    >
                                    <span>{category.name}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                        setData(
                                            "categories",
                                            data.categories.filter((id) => id !== category.id)
                                        )
                                        }
                                        className="text-red-500 font-bold"
                                    >
                                        ✕
                                    </button>
                                    </div>
                                )
                                );
                            })}
                            </div>

                            <div className="relative mt-2">
                            <Input
                                value={categoryInput}
                                onChange={(e) => {
                                const value = e.target.value;
                                setCategoryInput(value);
                                setFilteredCategories(
                                    categories
                                    .filter(
                                        (category:any) =>
                                        category.name.toLowerCase().includes(value.toLowerCase()) &&
                                        !data.categories.includes(category.id)
                                    )
                                    .map(({ id, name }:any) => ({ id, name, parent_id: null }))
                                );
                                }}
                                placeholder="Search or add category"
                            />

                            {filteredCategories.length > 0 && (
                                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                {filteredCategories.map((category) => (
                                    <div
                                    key={category.id}
                                    onClick={() => handleCategorySelect(category)}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                    {category.name}
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                            {errors.categories && (
                            <p className="text-red-500 text-sm">{errors.categories}</p>
                            )}

                    </div>
                        
                    <div className='md:flex w-full gap-5'>
                        <div className='w-full'>
                            <Label htmlFor="usageLimit" className="block text-lg font-medium">
                                Usage Limit
                            </Label>
                            <Input id="usageLimit" type="number" name="limit" value={data.limit?.toString()} 
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setData("limit", isNaN(value) ? 0 : value); // Ensure value is a valid number
                                }} required />
                            
                        </div>
                        <div className='w-full'>
                            <Label htmlFor="usage" className="block text-lg font-medium">
                                Usage
                            </Label>
                            <Input id="usage" type="number" name="usage" value={data.usage?.toString()}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setData("usage", isNaN(value) ? 0 : value); // Ensure value is a valid number
                                }} required />
                             
                        </div>
                    </div>


                </CardContent>
                <CardFooter className="flex justify-between">
                    <Select
                            defaultValue={data.status || 'active'}
                            onValueChange={(value) => setData("status", value)}
                            >
                            <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select Status"/>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            </SelectContent>
                    </Select>

                    <Button className='hover:bg-black' type="submit" onClick={handleSubmit} disabled={processing} variant="dark">Publish</Button>
                </CardFooter>
            </Card>
        </form>
    </AuthenticatedLayout>
  )
}
