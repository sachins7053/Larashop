'use client'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button"
import { useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Switch } from "@/Components/ui/switch"
import { Card, CardContent } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"

// Mock data for categories and brands
const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books']
const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'IKEA']


export default function AddProduct() {
    const [isVariableProduct, setIsVariableProduct] = useState(false)
    const [mainImage, setMainImage] = useState<string | null>(null)
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    const [attributeGroups, setAttributeGroups] = useState([
      { name: 'Size', values: ['S', 'M', 'L'] },
      { name: 'Color', values: ['Red', 'Blue', 'Green'] },
      { name: 'Pattern', values: ['Solid', 'Striped', 'Floral'] }
    ])
    const [variations, setVariations] = useState([{ attributes: {}, mrpPrice: '', salePrice: '', stock: '' }])
    const [productStatus, setProductStatus] = useState('draft')
  
    const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => setMainImage(e.target?.result as string)
        reader.readAsDataURL(file)
      }
    }
  
    const handleGalleryImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files) {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file))
        setGalleryImages(prevImages => [...prevImages, ...newImages])
      }
    }
  
    const addAttributeGroup = () => {
      setAttributeGroups([...attributeGroups, { name: '', values: [''] }])
    }
  
    const updateAttributeGroup = (
        index: number,
        field: 'name' | 'values',
        value: string | string[]
      ) => {
        const newGroups = [...attributeGroups]
      
        if (field === 'name' && typeof value === 'string') {
          newGroups[index][field] = value
        } else if (field === 'values' && Array.isArray(value)) {
          newGroups[index][field] = value
        } else {
          throw new Error("Type mismatch: 'name' expects a string and 'values' expects a string[]")
        }
      
        setAttributeGroups(newGroups)
      }
      
  
    const removeAttributeGroup = (index: number) => {
      setAttributeGroups(attributeGroups.filter((_, i) => i !== index))
    }
  
    const addVariation = () => {
      setVariations([...variations, { attributes: {}, mrpPrice: '', salePrice: '', stock: '' }])
    }
  
    interface Variation {
        attributes: { [key: string]: string }
        mrpPrice: string
        salePrice: string
        stock: string
      }
      
      const updateVariation = (index: number, field: keyof Variation | `attribute-${string}`, value: string) => {
        const newVariations = [...variations]
        
        if (field.startsWith('attribute-')) {
          const attributeName = field.split('-')[1]
          newVariations[index].attributes = { 
            ...newVariations[index].attributes, 
            [attributeName]: value 
          }
        } else {
          newVariations[index][field as keyof Variation] = value
        }
      
        setVariations(newVariations)
      }
      
  
    const removeVariation = (index: number) => {
      setVariations(variations.filter((_, i) => i !== index))
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <form className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                    <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input id="productName" placeholder="Enter product name" />
                    </div>

                    <div>
                        <Label htmlFor="shortDescription">Short Description</Label>
                        <Input id="shortDescription" placeholder="Enter short description" />
                    </div>

                    <div>
                        <Label htmlFor="fullDescription">Full Description</Label>
                        <Textarea id="fullDescription" placeholder="Enter full product description" className="min-h-[200px]" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                        <Label htmlFor="mrpPrice">MRP Price</Label>
                        <Input id="mrpPrice" type="number" placeholder="0.00" />
                        </div>
                        <div>
                        <Label htmlFor="salePrice">Sale Price</Label>
                        <Input id="salePrice" type="number" placeholder="0.00" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                        id="variable-product"
                        checked={isVariableProduct}
                        onCheckedChange={setIsVariableProduct}
                        />
                        <Label htmlFor="variable-product">Variable product</Label>
                    </div>
                    
                    {isVariableProduct && (
                        <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Product Attributes</h2>
                        {attributeGroups.map((group, groupIndex) => (
                            <Card key={groupIndex}>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`attribute-group-${groupIndex}`}>Attribute Group</Label>
                                    <Input
                                    id={`attribute-group-${groupIndex}`}
                                    value={group.name}
                                    onChange={(e) => updateAttributeGroup(groupIndex, 'name', e.target.value)}
                                    placeholder="e.g. Size, Color"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`attribute-values-${groupIndex}`}>Attribute Values</Label>
                                    <Input
                                    id={`attribute-values-${groupIndex}`}
                                    value={group.values.join(', ')}
                                    onChange={(e) => updateAttributeGroup(groupIndex, 'values', e.target.value.split(',').map(v => v.trim()))}
                                    placeholder="e.g. Small, Medium, Large"
                                    />
                                </div>
                                </div>
                                <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="mt-4"
                                onClick={() => removeAttributeGroup(groupIndex)}
                                >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Attribute Group
                                </Button>
                            </CardContent>
                            </Card>
                        ))}
                        <Button type="button" onClick={addAttributeGroup}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Attribute Group
                        </Button>

                        <h2 className="text-xl font-semibold">Product Variations</h2>
                        {variations.map((variation, index) => (
                            <Card key={index}>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                {attributeGroups.map((group) => (
                                    <div key={group.name}>
                                    <Label htmlFor={`variation-${index}-${group.name}`}>{group.name}</Label>
                                    <Select onValueChange={(value) => updateVariation(index, `attribute-${group.name}`, value)}>
                                        <SelectTrigger id={`variation-${index}-${group.name}`}>
                                        <SelectValue placeholder={`Select ${group.name}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {group.values.map((value) => (
                                            <SelectItem key={value} value={value}>{value}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    </div>
                                ))}
                                <div>
                                    <Label htmlFor={`variation-${index}-mrp`}>MRP Price</Label>
                                    <Input
                                    id={`variation-${index}-mrp`}
                                    type="number"
                                    value={variation.mrpPrice}
                                    onChange={(e) => updateVariation(index, 'mrpPrice', e.target.value)}
                                    placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`variation-${index}-sale`}>Sale Price</Label>
                                    <Input
                                    id={`variation-${index}-sale`}
                                    type="number"
                                    value={variation.salePrice}
                                    onChange={(e) => updateVariation(index, 'salePrice', e.target.value)}
                                    placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`variation-${index}-stock`}>Stock</Label>
                                    <Input
                                    id={`variation-${index}-stock`}
                                    type="number"
                                    value={variation.stock}
                                    onChange={(e) => updateVariation(index, 'stock', e.target.value)}
                                    placeholder="0"
                                    />
                                </div>
                                </div>
                                <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="mt-4"
                                onClick={() => removeVariation(index)}
                                >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Variation
                                </Button>
                            </CardContent>
                            </Card>
                        ))}
                        <Button type="button" onClick={addVariation}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Variation
                        </Button>
                        </div>
                    )}
                    </div>

                    <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                        <div className="space-y-4">
                            <div>
                            <Label htmlFor="mainImage">Main Product Image</Label>
                            <div className="mt-2">
                                <Label htmlFor="mainImage" className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Image
                                </Label>
                                <Input id="mainImage" type="file" className="hidden" onChange={handleMainImageUpload} accept="image/*" />
                            </div>
                            {mainImage && (
                                <div className="mt-4">
                                <img src={mainImage} alt="Main product" className="w-full h-auto" />
                                </div>
                            )}
                            </div>

                            <div>
                            <Label htmlFor="galleryImages">Gallery Images</Label>
                            <div className="mt-2">
                                <Label htmlFor="galleryImages" className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Images
                                </Label>
                                <Input id="galleryImages" type="file" multiple className="hidden" onChange={handleGalleryImageUpload} accept="image/*" />
                            </div>
                            {galleryImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                {galleryImages.map((img, index) => (
                                    <img key={index} src={img} alt={`Gallery ${index + 1}`} className="w-full h-auto" />
                                ))}
                                </div>
                            )}
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                        <div className="space-y-4">
                            <div>
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            </div>
                            <div>
                            <Label htmlFor="brand">Brand</Label>
                            <Select>
                                <SelectTrigger id="brand">
                                <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Status</h2>
                        <RadioGroup defaultValue="draft" onValueChange={setProductStatus}>
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="draft" id="draft" />
                            <Label htmlFor="draft">Draft</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="published" id="published" />
                            <Label htmlFor="published">Published</Label>
                            </div>
                        </RadioGroup>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full">
                        {productStatus ===   'draft' ? 'Save Draft' : 'Publish Product'}
                    </Button>
                    </div>
                </form>
                </div>
        </AuthenticatedLayout>
    );
}
