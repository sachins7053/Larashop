import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link , usePage} from '@inertiajs/react';
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, Pencil } from 'lucide-react';



interface Enquiry {
  id: string;
  user_id: number;
  customer_name: string;
  customer_email: string;
  mobile_no: string;
  lead_details: string;
  image_url: string | null;  
  link: string;  
  status: string; 
  priority: 'low' | 'medium' | 'high';  
  created_at: string;  
  updated_at: string;  
}




const Leadindex = () => {

  const mockEnquiries:any = usePage().props.leads
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEnquiries, setSelectedEnquiries] = useState<Set<string>>(new Set())

  const itemsPerPage = 10

  useEffect(() => {
    
    const fetchEnquiries = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setEnquiries(mockEnquiries)
    }

    fetchEnquiries()
  }, [])

  useEffect(() => {
    let result = enquiries

    if (searchQuery || statusFilter !== 'all' || priorityFilter !== 'all') {
      result = enquiries.filter(enquiry => 
        
        (searchQuery ? enquiry.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       enquiry.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
        
        
        (statusFilter !== 'all' ? enquiry.status === statusFilter : true) &&
  
        
        (priorityFilter !== 'all' ? enquiry.priority === priorityFilter : true)
      );
    }

    setFilteredEnquiries(result)
    setCurrentPage(1)
  }, [enquiries, searchQuery, statusFilter, priorityFilter])

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage)
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleSelectAll = () => {
    if (selectedEnquiries.size === paginatedEnquiries.length) {
      setSelectedEnquiries(new Set())
    } else {
      setSelectedEnquiries(new Set(paginatedEnquiries.map(e => e.id)))
    }
  }





  return (
    <AuthenticatedLayout 
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            All Leads
        </h2>
    }
    >
    <Head title="All Leads" />

        <div className='container mx-auto bg-white rounded-lg border shadow-lg p-6 mt-4'>

        <div className="w-full space-y-4 p-8">
            <h2 className="text-3xl font-bold tracking-tight">Enquiries</h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Search enquiries..."
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
                  <SelectItem value={"pending"}>Pending</SelectItem>
                  <SelectItem value={"in progress"}>In Progress</SelectItem>
                  <SelectItem value={"accept"}>Accept</SelectItem>
                  <SelectItem value={"reject"}>Reject</SelectItem>
                  <SelectItem value={"completed"}>Completed</SelectItem>
                  <SelectItem value={"cancelled"}>Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="sm:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"all"}>All Priorities</SelectItem>
                  <SelectItem value={"low"}>Low</SelectItem>
                  <SelectItem value={"medium"}>Medium</SelectItem>
                  <SelectItem value={"high"}>High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      
                      <TableCell>{enquiry.customer_name}</TableCell>
                      <TableCell>{enquiry.customer_email}</TableCell>
                      <TableCell>{enquiry.mobile_no}</TableCell>
                      <TableCell>
                        <Badge variant={enquiry.status === "pending" ? "success" : enquiry.status == "in progress" ? "warning" : enquiry.status == "completed" 
  ? "outline"  :  "destructive" }>
                          {enquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={enquiry.priority === "high" ? "destructive" : enquiry.priority == "medium" ? "warning" : "success"}>
                          {enquiry.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(enquiry.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link 
                        href={route('leads.show',  { id: enquiry.id })}
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
                Showing {paginatedEnquiries.length} of {filteredEnquiries.length} results
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

export default Leadindex