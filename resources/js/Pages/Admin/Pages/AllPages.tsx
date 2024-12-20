import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link , usePage} from '@inertiajs/react';
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, Pencil } from 'lucide-react';
import { PageProps } from '@/types';

interface Pages {
  id: string,
  title: string,
  slug: string,
  content: string,
  type: string,
  status: string,
  created_at: string,
}

export default function Pages({pages}:PageProps<{pages:Pages[]}>) {
  const pageData = pages;
  const [Pages, setPages] = useState<Pages[]>([])
  const [filteredPages, setFilteredPages] = useState<Pages[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set())

  const itemsPerPage = 10

  console.log(Pages)
  console.log("Pages: " + pages)

  useEffect(() => {
    
    const fetchPages = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setPages(pageData)
    }
    
    fetchPages()
    console.log('PageData fetched', pageData)
  }, [])

  useEffect(() => {
    let result = Pages

    if (searchQuery || statusFilter !== 'all') {
      result = Pages.filter(page => 
        
        (searchQuery ? page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       page.type.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
        
        
        (statusFilter !== 'all' ? page.status === statusFilter : true)
      );
    }

    setFilteredPages(result)
    setCurrentPage(1)
  }, [Pages, searchQuery, statusFilter])

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage)
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleSelectAll = () => {
    if (selectedPages.size === paginatedPages.length) {
      setSelectedPages(new Set())
    } else {
      setSelectedPages(new Set(paginatedPages.map(e => e.id)))
    }
  }





  return (
    <AuthenticatedLayout 
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            All Pages
        </h2>
    }
    >
    <Head title="All Pages" />

        <div className='container mx-auto bg-white rounded-lg border shadow-lg p-6 mt-4'>

        <div className="w-full space-y-4 p-8">
            <h2 className="text-3xl font-bold tracking-tight">Pages</h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Search Pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:w-[300px]"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All Statuses</SelectItem>
                  <SelectItem value={"active"}>Active</SelectItem>
                  <SelectItem value={"draft"}>Draft</SelectItem>
                  <SelectItem value={"inactive"}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPages.map((page) => (
                    <TableRow key={page.id}>
                      
                      <TableCell>{page.title}</TableCell>
                      <TableCell>
                        <Badge variant={page.status === "active" ? "success" : page.status == "draft" ? "outline" :  "destructive" }>
                          {page.status}
                        </Badge>
                      </TableCell>
                     
                      <TableCell>{new Date(page.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link 
                        href={route('pages.edit',  { id: page.id })}
                        >
                        <EyeIcon className='w-5' />
                     
                        </Link>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedPages.length} of {filteredPages.length} results
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
    </AuthenticatedLayout>
  )
}