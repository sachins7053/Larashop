import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePage } from "@inertiajs/react"

// Mock data for categories and subcategories
interface categories {
  id: number
  name: string
}

export function BasicInformation({ data, setData} :any) {
  const categories: any = usePage().props.categories


  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="productName" value={data.productName} onChange={(e:any) => setData('productName', e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={data.description} onChange={(e:any) => setData('description', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" value={data.content} onChange={(e:any) => setData('content', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={data?.category} onValueChange={(e:any) => setData('category', e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category:any) => (
              <SelectItem key={category?.id} value={category?.id.toString()}>
                {category?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    
      <div>
        <Label htmlFor="status">Status</Label>
        <Select name="status" value={data.status} onValueChange={(e:any) => setData('status', e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

