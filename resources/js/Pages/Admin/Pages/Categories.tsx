import { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Plus, Trash2, Upload, Check, ChevronsUpDown  } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { PageProps } from '@/types'
import { cn } from "@/lib/utils"
import Paginations from '@/components/Pagination';
import FileUploader from '@/components/file-uploader'
import { useToast } from '@/hooks/use-toast'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios'

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    parentCategory: string | null; // Allow string or null
    image: string[]; // Adjust this if needed
    icon: string;
    status: string;
  }


  interface Categories {
    find(arg0: (c: any) => boolean): unknown;
    map(arg0: (category: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id:number;
    name:string;
    parentCategory?: number;
  }

  

export default function Component() {
  const { toast } = useToast()
  const [ name, setName] = useState('');
  const [ slug, setSlug] = useState('');
  const [ description, setDescription] = useState('');
  const [ parentCat, setParentCat] = useState('0');
  const [icon, setIcon] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('active');
  const [categories, setCategories] = useState<Category[]>([]);
  const [Parentcategories, setParentCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const itemsPerPage = 2;
  //const totalItems = 100; // Example total items count

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch data or update state based on `page`
  };

  const handleParentCat = (value: string) => {
    setParentCat(value);
    console.log(value);
  };

  const [catImage, setCatImage] = useState({
    image: null as string | null
  })

  useEffect(() => {
    fetchCategories();
}, [currentPage, itemsPerPage]);

  const fetchCategories = async () => {

    try {
        const response = await axios.get('/api/categories',
          {
            params: {
              page: currentPage,
              limit: itemsPerPage,
            },
          }
        );
        const cats = response.data
        setCategories(response.data.items);
        setTotalItems(response.data.total);
        //console.log(response.data)
        //console.log(cats) // Adjust based on API response structure
    } catch (error) {
        //console.error("Error fetching products:", error);
    } 
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


  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    image: '',
    icon: '',
    status: 'active'
  })

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', name);
    formData.append('description', description);
    formData.append('parent_id', parentCat);
    formData.append('image', image); // Adjust this if needed
    formData.append('status', status); // Adjust this if needed
    formData.append('icon', icon); // Adjust this if needed

        try {
          const response = await axios.post("/api/categories", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            toast({
              variant: "success",
              title: "Category Submitted Successfully",
              description: "There was a problem with your request.",
            })
        //console.log("Product saved:", response.data);
      } catch (error) {
          toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
             description: "There was a problem with your request.",
            })
          //console.log(Array.from(formData.entries()));
        //console.error("Error saving product:", error);
      }

    
  }

  



  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add Product Category</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Category </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category-name">Category Name</Label>
                      <Input
                        onChange={(event) => setName(event.target.value)}
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
                            {Parentcategories.find(category => category.id === parentCat)?.name || "Select Parent Category"}
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
                            multiple={false} // Pass `multiple={false}` for single image
                          />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-image">Gallery Image</Label>
                      <div className="flex items-center space-x-2">
                        
                          <FileUploader 
                            onImageSelect={(imageUrls: any) =>  setGallery(imageUrls || [])}
                            selectedImages={gallery}
                            multiple={true} // Pass `multiple={false}` for single image
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

              <Card>
                <CardHeader>
                  <CardTitle>Added Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category: any) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{category.icon || '📁'}</div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">Status: {category.status}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                <Paginations
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
                </CardFooter>
              </Card>
            </div>
          </div>
          </AuthenticatedLayout>
  )
}