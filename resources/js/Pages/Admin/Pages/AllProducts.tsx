'use client'

import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState,  useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Search, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { PageProps } from '@/types';
    /*// Mock data for demonstration
    const mockProducts = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99, stock: 50, status: 'Active' },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 29.99, stock: 100, status: 'Active' },
    { id: 3, name: 'Product 3', category: 'Home & Garden', price: 149.99, stock: 25, status: 'Inactive' },
    { id: 4, name: 'Product 4', category: 'Electronics', price: 199.99, stock: 10, status: 'Active' },
    { id: 5, name: 'Product 5', category: 'Books', price: 14.99, stock: 75, status: 'Active' },
    // Add more mock products as needed
    ] */

const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Books']
const statuses = ['All', 'Published', 'Inactive']

interface Product {
    id: number;
    name: string;
    category: string;
    status: string;
    price: number;
    stock: number;
    categories: Category[];
    // Add other properties as needed
  }

  interface Category {
    id: number;
    name: string;
  }

export default function AllProductsPage( { product }: PageProps <{ product : string[] }> ) {
  const currency:any = usePage().props.env;
    const [mockProducts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [statusFilter, setStatusFilter] = useState('All') 
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({
            current_page: 1,
            last_page: 1,
            next_page_url: null,
            prev_page_url: null,
        });
    const productsPerPage = 10

    useEffect(() => {
        fetchProducts(pagination.current_page);
    }, [pagination.current_page]);

    const fetchProducts = async (current_page:  number) => {

        try {
            const response = await axios.get('/api/products');
            setProducts(response.data); 
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };


    
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || product.category === categoryFilter) &&
    (statusFilter === 'All' || product.status === statusFilter)
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handleEdit = (productId: number) => {
    // Implement edit functionality
    console.log(`Edit product with ID: ${productId}`)
  }

  const handleDelete = (productId: number) => {
    // Implement delete functionality
    console.log(`Delete product with ID: ${productId}`)
    setProductToDelete(productId)
    setIsDeleteDialogOpen(true)
  }
  const handleDeleteConfirm = async () => {
    if (productToDelete === null) return

    // Simulate API call
    try {
      // In a real application, you would make an API call here
      // await deleteProduct(productToDelete)

        const response = await axios.delete('/api/products/' + productToDelete);
         // Adjust based on API response structure
      
      // For this example, we'll just remove the product from the local state
      setProducts(mockProducts.filter(product => product.id !== productToDelete))
        
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
        variant: "success",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting the product. Please try again.",
        variant: "destructive",
      })
    }

    setIsDeleteDialogOpen(false)
    setProductToDelete(null)
  }


  return (
    
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    All Product
                </h2>
            }
        >
            <Head title="All Product" />
    <div className="container bg-white rounded-lg max-w-7xl shadow-lg mx-auto my-8 min-h-screen px-4 py-8">
 
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="search" className="sr-only">
                  Search Products
                </Label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category" className="sr-only">
                  Filter by Category
                </Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="sr-only">
                  Filter by Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.categories?.map((category:Category) => category.name)}</TableCell>
                      <TableCell>{currency}{product.price ? product.price.toFixed(2) : ''}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={route('product.edit', {id: product.id})}>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                            <Edit className="w-4 h-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          </Link>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
      
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">First Page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Next Page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Last Page</span>
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </AuthenticatedLayout>
  )
}