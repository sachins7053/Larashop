"use client"
import axios from 'axios';
import { PageProps } from '@/types';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Plus, Trash2, Upload, Check, ChevronsUpDown  } from 'lucide-react'
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils"
import { Head } from '@inertiajs/react';
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Switch } from "@/Components/ui/switch"
import FileUploader from '@/Components/file-uploader'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/Components/ui/command"
import { Popover, PopoverContent, PopoverTrigger,} from "@/Components/ui/popover"

interface Category {
    id: string;
    name: string;
    slug: string;
    parent_id: string;
    description: string;
    image: string ;
    icon: string | null; 
    // Add more fields based on your Product model
}
export default function EditCategory(category :Category){
    const { toast } = useToast()
    const [ name, setName] = useState('');
    const [ slug, setSlug] = useState('');
    const [ description, setDescription] = useState('');
    const [ parentCat, setParentCat] = useState('0');
    const [icon, setIcon] = useState('');
    const [image, setImage] = useState<string>('');
    const [status, setStatus] = useState<string>('active');
    const [selectedCat, setSelectedCat] = useState<Category[]>([]);
    const [Parentcategories, setParentCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        slug: '',
        description: '',
        parentCategory: '',
        image: '',
        icon: '',
        status: 'active'
      })

    const handleParentCat = (value: string) => {
        setParentCat(value);
        console.log(value);
      };

    useEffect(() => {
        fetchParentCat();
        handleParentCat;
      }, []
    );
    
      const fetchParentCat = async () => {
    
        try {
            const response = await axios.get('/api/pro-cat');
            const cats = response.data
            setParentCategories(response.data);
            //console.log(response.data)
            //console.log(cats) // Adjust based on API response structure
        } catch (error) {
            //console.error("Error fetching products:", error);
        } 
    };

    useEffect(() => {
        if (category.parent_id) {
            setParentCat(category.parent_id);
        }
      }, [category.parent_id]);

    useEffect(() => {
        if (category.image) {
          setImage(category.image);
        }
      }, [category.image]);

    return (

        <AuthenticatedLayout
             header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
            >
            <Head title="Edit Category" />
            <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit {category.name}</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Add New Category </CardTitle>
                </CardHeader>
                <CardContent>
                  <form  className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        onChange={(event) => setName(event.target.value)}
                        value={category.name}
                        id="category-name"
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-slug">Slug</Label>
                      <Input
                        onChange={(event) => setSlug(event.target.value)}
                        id="category-slug"
                        placeholder="enter-slug"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-description">Description</Label>
                      <Textarea
                        value={category.description}
                        onChange={(event) => setDescription(event.target.value)}
                        id="category-description"
                        placeholder="Enter category description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-category">Parent Category</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          > 
                          { parentCat ? Parentcategories.find(cat => cat.id === parentCat)?.name : "Select Parent Category"
                          }
                            { //category.parent_id ? Parentcategories.find(cat => cat.id === category.parent_id)?.name : Parentcategories.find(cat => cat.id === parentCat)?.name || 'Select Parent Category'
      }

    { //category.parent_id == "0" ? "Select Parent Category" : Parentcategories.find(cat => cat.id === category.parent_id)?.name || Parentcategories.find(cat => cat.id === parentCat)?.name || 'Select Parent Category' 
    }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search Category..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem
                                  value="0"
                                  onSelect={ () => {
                                     setParentCat('0');
                                     setOpen(false);
                                    }}
                                  >
                                    No Parent Category
                                  </CommandItem>
                                {Parentcategories.map((category) => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.id}
                                    onSelect={() => {
                                      setParentCat(category.id )
                                      console.log(category.id);

                                      setOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        parentCat === category.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>


                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-image">Image</Label>
                      <div className="flex items-center space-x-2">
                          <FileUploader
                            onImageSelect={(imageUrl: any) => setImage( imageUrl )}
                            selectedImages={image}
                            multiple={false}
                          />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-icon">Icon (emoji or text)</Label>
                      <Input
                        id="category-icon"
                        placeholder="Enter icon"
                        onChange={(event) => setIcon(event.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="category-status"
                        checked={newCategory.status === 'active'}
                        onCheckedChange={(checked:boolean ) => setStatus( checked ? 'active' : 'inactive' )}
                      />
                      <Label htmlFor="category-status">Active</Label>
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Button>
                  </form>
                </CardContent>
              </Card>
              </div>

            {/* Form to edit the category */}
        </AuthenticatedLayout>
)}