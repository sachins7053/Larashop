import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { Plus, Trash2, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FileUploader from '@/components/file-uploader';
import { useToast } from "@/hooks/use-toast"
import { PageProps } from '@/types';
import {useForm} from '@inertiajs/react';
import Select from "react-select";
import { Separator } from '@/components/ui/separator';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    content: string;
    sale_price: string;
    images : string[] | null;
    is_variation : boolean | number;
    status: string;

}
interface Category {
    id: number;
    name: string;
}

type AttributeValue = {
    value_id: number;
    value: string;
  };
  
  type Attribute = {
    attribute_id: number;
    attribute_name: string;
    values: AttributeValue[];
  };
  
  type Variation = {
    attributes: { attribute_name: string; attribute_value: string }[];
    mrp: string;
    salePrice: string;
    stock: string;
    sku: string;
  };


// Mock data for categories and brands
// const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books']
const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'IKEA']


export default function EditProduct( {product, categories, product_var , Attributes}:PageProps<{ product:Product; categories:Category[]; product_var:Variation[]; Attributes:Attribute[];}> ) {
    const { toast } = useToast()
   
    const [isVariableProduct, setIsVariableProduct] = useState(product.is_variation == 1 ? true : false)
    const [mainImage, setMainImage] = useState<string>(product.images === null ? '' : product.images[0] )
    const [galleryImages, setGalleryImages] = useState<string[]>(product.images === null ? [] : product.images)
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [variations, setVariations] = useState<Variation[]>(product_var || []);
    const [selectedAttributes, setSelectedAttributes] = useState<{
        [key: string]: string[];
      }>({});
    //const [attributeGroups, setAttributeGroups] = useState([]);
    //const [variations, setVariations] = useState([]);

    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    //const [productStatus, setProductStatus] = useState("draft");
    const [productStatus, setProductStatus] = useState(product.status || 'draft')
    

    console.log(product)
    console.log("category",categories)
    console.log("product_var", product_var)
    console.log("Attributes", Attributes)
    console.log('variations', variations)
    console.log('selectedCategories', selectedCategories)

   
    
  

      const handleSelectChange = (selectedOptions: any) => {
        // If no categories are selected, set the selected categories to an empty array
        const selectedCategories = selectedOptions ? selectedOptions.map((option: any) => ({
          id: option.value,
          name: option.label
        })) : [];
        setSelectedCategories(selectedCategories);
        setData('categories', selectedCategories)
      };
    
      // Handle attribute value selection
      const handleSelectValue = (attributeName: string, selectedValues: any) => {
        setSelectedAttributes((prev) => {
          return {
            ...prev,
            [attributeName]: selectedValues ? selectedValues.map((item: any) => item.value) : [],
          };
        });
      };
    
      // Generate combinations for variations
      const generateVariations = () => {
        const keys = Object.keys(selectedAttributes);
        if (keys.length === 0) return;
    
        const combinations = keys.reduce<string[][]>(
          (acc, key) =>
            acc.flatMap((combination) =>
              selectedAttributes[key].map((value) => [...combination, `${key}:${value}`])
            ),
          [[]]
        );
    
        const newVariations = combinations.map((combination) => ({
          attributes: combination.map((item) => {
            const [attribute_name, attribute_value] = item.split(":");
            return { attribute_name, attribute_value };
          }),
          mrp: "",
          salePrice: "",
          stock: "",
          sku: "",
        }));
    
        setVariations(newVariations);
    }

   

    const {data , setData, patch, processing, errors} = useForm({

        id: product.id ,
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        content: product.content || '',
        sale_price: product.sale_price || '',
        images : product.images || '',
        categories: selectedCategories,
        variations: variations

    })

    const handleChange = (e:any) => {
        setData(e.target.name, e.target.value);  // Dynamically set field value based on input name
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        console.log("form data",data)
        

        patch(route('product.update', {id:product.id}),{


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
                    title: "Your Product has been updated",
                  })

            }, 
        }
    
    
    ) };
  
    console.error(errors)

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Product
                </h2>
            }
        >
            <Head title="Edit Product" />

            <div className="container mx-auto px-4 py-8">
                <form  className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6 p-6 bg-white rounded-lg">
                    <div>
                        <Label htmlFor="productName">Product Name </Label>
                        <Input name="name" onChange={handleChange} value={data.name} id="productName" placeholder="Enter product name" />
                    </div>

                    <div>
                        <Label htmlFor="shortDescription">Short Description</Label>
                        <Input onChange={(event) => setData('description' ,event.target.value)} value={data.description} id="shortDescription" placeholder="Enter short description" />
                    </div>

                    <div>
                        <Label htmlFor="fullDescription">Full Description</Label>
                        <Textarea onChange={(event) => setData('content',event.target.value)} value={data.content} id="fullDescription" placeholder="Enter full product description" className="min-h-[200px]" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                        <Label htmlFor="mrpPrice">MRP Price</Label>
                        <Input onChange={(event) => setData('price' ,event.target.value)} value={data.price} id="mrpPrice" type="number" placeholder="0.00" />
                        </div>
                        <div>
                        <Label htmlFor="salePrice">Sale Price</Label>
                        <Input onChange={(event) => setData('sale_price', event.target.value)} value={data.sale_price}  id="salePrice" type="number" placeholder="0.00" />
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

                        {/* Display all attributes */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-class">
                                {Attributes?.map((attribute) => (
                                <div key={attribute.attribute_id} className="border p-4 rounded shadow">
                                    <h3 className="font-medium mb-2">{attribute.attribute_name}</h3>
                                    <div className="space-y-2">
                                    <Select
                                        isMulti
                                        options={attribute.values.map((value) => ({
                                        value: value.value,
                                        label: value.value,
                                        }))}
                                        onChange={(selectedValues) => handleSelectValue(attribute.attribute_name, selectedValues)}
                                        value={selectedAttributes[attribute.attribute_name]?.map((value) => ({
                                        value,
                                        label: value,
                                        }))}
                                        placeholder={`Select ${attribute.attribute_name}`}
                                    />
                                    </div>
                                </div>
                                ))}
                            </div>

                            {/* Generate Variations Button */}
                            <Button
                                type="button"
                                className="text-white px-4 py-2 rounded mt-4"
                                onClick={generateVariations}
                            >
                                Generate Variations
                            </Button>

                            {/* Display Selected Attributes */}
                            {selectedAttributes.length  && (
                            <div className="mt-4">
                                <h3 className="text-lg font-bold mb-4">Selected Attributes</h3>
                                <div className="flex flex-wrap gap-2">
                                {Object.keys(selectedAttributes).map((attributeName) => (
                                    selectedAttributes[attributeName].map((value) => (
                                    <div key={`${attributeName}-${value}`} className="bg-gray-200 px-3 py-1 rounded flex items-center">
                                        <span>{`${attributeName}: ${value}`}</span>
                                        <button
                                        className="ml-2 text-red-500"
                                        onClick={() => {
                                            setSelectedAttributes((prev) => {
                                            const updated = { ...prev };
                                            updated[attributeName] = updated[attributeName].filter((v) => v !== value);
                                            if (updated[attributeName].length === 0) {
                                                delete updated[attributeName];
                                            }
                                            return updated;
                                            });
                                        }}
                                        >
                                        Remove
                                        </button>
                                    </div>
                                    ))
                                ))}
                                </div>
                            </div>
                                )}

                            {/* Display Generated Variations */}
                            {variations.length > 0 && (
                                <div className="mt-6">
                                <h3 className="text-lg font-bold mb-4">Generated Variations</h3>
                                <div className="space-y-4">
                                    {variations?.map((variation, index) => (
                                    <div key={index} className="border p-4 rounded shadow md:items-center md:justify-between">
                                        <div className="flex space-x-5 mb-3">
                                            {variation?.attributes.map((attr, i) => (
                                                <>
                                                    <p key={i}>
                                                        <strong>{attr.attribute_name}:</strong> {attr.attribute_value}
                                                    </p>
                                                    <Separator orientation="vertical" />
                                                </>
                                            ))}
                                        </div>
                                        <div className='md:flex gap-5'>
                                        <div className="w-full">
                                        <Input
                                            type="text"
                                            placeholder="MRP"
                                            className="w-full"
                                            value={variation.mrp}
                                            onChange={(e) => {
                                            const updatedVariations = [...variations];
                                            updatedVariations[index].mrp = e.target.value;
                                            setVariations(updatedVariations);
                                            }}
                                        />
                                        </div>
                                        <div className="w-full">
                                        <Input
                                            type="text"
                                            placeholder="Sale Price"
                                            className="w-full"
                                            value={variation.salePrice}
                                            onChange={(e) => {
                                            const updatedVariations = [...variations];
                                            updatedVariations[index].salePrice = e.target.value;
                                            setVariations(updatedVariations);
                                            }}
                                        />
                                        </div>
                                        <div className="w-full">
                                        <Input
                                            type="text"
                                            placeholder="Stock"
                                            className="w-full"
                                            value={variation.stock}
                                            onChange={(e) => {
                                            const updatedVariations = [...variations];
                                            updatedVariations[index].stock = e.target.value;
                                            setVariations(updatedVariations);
                                            }}
                                        />
                                        </div>
                                            <div className="w-full">
                                            <Input
                                                type="text"
                                                placeholder="SKU"
                                                className="w-full border rounded px-3 py-2"
                                                value={variation.sku}
                                                onChange={(e) => {
                                                const updatedVariations = [...variations];
                                                updatedVariations[index].sku = e.target.value;
                                                setVariations(updatedVariations);
                                                }}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            )}
                       
                        </div>
                    )}
                    </div>

                    <div className="space-y-6">
                    <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                        <div className="space-y-4">
                            <div>
                            <Label>Main Product Image</Label>
                            <div className="mt-2">
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setMainImage( imageUrl )}
                                        selectedImages={mainImage}
                                        multiple={false} // Pass `multiple={false}` for single image
                                    />
                            </div>
                            {mainImage && (
                                <div className="mt-4">
                                <img src={mainImage} alt="Main product" className="w-full h-auto" />
                                </div>
                            )}
                            </div>

                            <div>
                            <Label >Gallery Images</Label>
                            <div className="mt-2">
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setGalleryImages( imageUrl )}
                                        selectedImages={galleryImages}
                                        multiple={true} // Pass `multiple={false}` for single image
                                    />
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
                            <Select
                                isMulti
                                options={categories.map((category) => ({
                                value: category.id,
                                label: category.name,
                                }))}
                                onChange={handleSelectChange}
                                value={selectedCategories.map((category) => ({
                                value: category.id,
                                label: category.name,
                                }))}
                                placeholder="Select categories"
                            />
                            {/* <Select>
                                <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
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
                            </Select> */}
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

                    <Button onClick={handleSubmit} type="submit" className="w-full">
                        {productStatus ===   'draft' ? 'Save Draft' : 'Publish Product'}
                    </Button>
                    </div>
                </form>
                </div>
        </AuthenticatedLayout>
    );
}
