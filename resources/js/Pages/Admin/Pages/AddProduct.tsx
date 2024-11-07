'use client'
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import FileUploader from '@/components/file-uploader'


// Mock data for categories and brands
const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books']
const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'IKEA']


export default function AddProduct() {
    const { toast } = useToast()
    const [productName, setProductName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [mrpPrice, setMrpPrice] = useState<string>('');
    const [salePrice, setSalePrice] = useState<string>('');
    const [isVariableProduct, setIsVariableProduct] = useState(false)
    const [mainImage, setMainImage] = useState<string | null>(null)
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    //const [attributeGroups, setAttributeGroups] = useState([]);
    //const [variations, setVariations] = useState([]);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    //const [productStatus, setProductStatus] = useState("draft");
    const [attributeGroups, setAttributeGroups] = useState([
      { name: 'Size', values: ['S', 'M', 'L'] },
      { name: 'Color', values: ['Red', 'Blue', 'Green'] },
      { name: 'Pattern', values: ['Solid', 'Striped', 'Floral'] }
    ])
      
    const [variations, setVariations] = useState([{ attributes: {}, mrpPrice: '', salePrice: '', stock: '' }])
    const [productStatus, setProductStatus] = useState('draft')
  
  
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

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append("name", productName);
        formData.append("description", shortDescription);
        formData.append("content", fullDescription);
        formData.append("price", mrpPrice);
        formData.append("sale_price", salePrice);
    //    formData.append("isVariableProduct", String(isVariableProduct));
    //    formData.append("category", category);
    //    formData.append("brand", brand);
        formData.append("status", productStatus);
    
    //    if (mainImage) {
    //      formData.append("images", images);
    //    }
        
    //    galleryImages.forEach((image, index) => {
    //      formData.append(`galleryImages[${index}]`, image);
    //    });
    
    //    formData.append("attributeGroups", JSON.stringify(attributeGroups));
        formData.append("variations", JSON.stringify(variations));
    
        try {
            const response = await axios.post("/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              toast({
                variant: "success",
                title: "Product Submitted Successfully",
                description: "There was a problem with your request.",
              })
          console.log("Product saved:", response);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              })
            console.log(Array.from(formData.entries()));
          console.error("Error saving product:", error);
        }
      };
  

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Product
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6 p-6 bg-white rounded-lg">
                    <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input onChange={(event) => setProductName(event.target.value)} id="productName" placeholder="Enter product name" />
                    </div>

                    <div>
                        <Label htmlFor="shortDescription">Short Description</Label>
                        <Input onChange={(event) => setShortDescription(event.target.value)} id="shortDescription" placeholder="Enter short description" />
                    </div>

                    <div>
                        <Label htmlFor="fullDescription">Full Description</Label>
                        <Textarea onChange={(event) => setFullDescription(event.target.value)} id="fullDescription" placeholder="Enter full product description" className="min-h-[200px]" />
                    </div>
                    {!isVariableProduct && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                        <Label htmlFor="mrpPrice">MRP Price</Label>
                        <Input onChange={(event) => setMrpPrice(event.target.value)} value={mrpPrice} id="mrpPrice" type="number" placeholder="0.00" />
                        </div>
                        <div>
                        <Label htmlFor="salePrice">Sale Price</Label>
                        <Input onChange={(event) => setSalePrice(event.target.value)} id="salePrice" type="number" placeholder="0.00" />
                        </div>
                    </div> )
                    }

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
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setMainImage( imageUrl )}
                                        selectedImages={mainImage}
                                        multiple={false} // Pass `multiple={false}` for single image
                                    />
                            </div>
                            </div>

                            <div>
                            <Label htmlFor="galleryImages">Gallery Images</Label>
                            <div className="mt-2">
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setGalleryImages( imageUrl )}
                                        selectedImages={galleryImages}
                                        multiple={true} // Pass `multiple={false}` for single image
                                    />
                            </div>
                           
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
