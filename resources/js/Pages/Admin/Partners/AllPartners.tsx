import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm , usePage} from '@inertiajs/react';
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Pencil } from 'lucide-react';
import { FormEventHandler } from 'react';
import {toast} from '@/hooks/use-toast'
import InputError from '@/components/InputError';



interface partner {
  id: string;
  name: string;
  email: string;
  mobile: string;
  image_url: string | null;  
  status: string | number;  
  priority: 'low' | 'medium' | 'high';  
  created_at: string;  
  updated_at: string;  
}




const Leadindex = () => {

  const Partners:any = usePage().props.partners
  const [partners, setpartners] = useState<partner[]>([])
  const [filteredpartners, setFilteredpartners] = useState<partner[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedpartners, setSelectedpartners] = useState<Set<string>>(new Set())
  const [partnerStatusValue, sePartnerStatus] = useState(0)

  const itemsPerPage = 10

  useEffect (() => {
    if(selectedPartnerId){
      setIsOpen(true);
      console.log(selectedPartnerId)
    }
  },[selectedPartnerId])




  useEffect(() => {
    
    const fetchpartners = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 500))
      setpartners(Partners)
    }

    fetchpartners()
  }, [])

  useEffect(() => {    
    let result = partners

    if (searchQuery || statusFilter !== 'all' || priorityFilter !== 'all') {
      result = partners.filter(partner => 
        
        (searchQuery ? partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       partner.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
        
        
        (statusFilter !== 'all' ? partner.status == statusFilter : true) &&
  
        
        (priorityFilter !== 'all' ? partner.priority === priorityFilter : true)
      );
    }

    setFilteredpartners(result)
    setCurrentPage(1)
  }, [partners, searchQuery, statusFilter, priorityFilter])

  const totalPages = Math.ceil(filteredpartners.length / itemsPerPage)
  const paginatedpartners = filteredpartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleSelectAll = () => {
    if (selectedpartners.size === paginatedpartners.length) {
      setSelectedpartners(new Set())
    } else {
      setSelectedpartners(new Set(paginatedpartners.map(e => e.id)))
    }
  }

  
  const handlePartnerRow = (partnerid:string) => {
    setSelectedPartnerId(partnerid); 
   
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    status: 0,
});

const handleSubmit :FormEventHandler = (e) => {
      e.preventDefault()

      post(route('partners.status' , {id: selectedPartnerId}), {
        onFinish: () => { 
          
          reset('status')
          toast({
            variant: "success",
            title: "Partner Status Has Been Changes",
          })

          setIsOpen(false)
        },
    })
}



  return (
    <AuthenticatedLayout 
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            All Partners
        </h2>
    }
    >
    <Head title="All Partners" />

        <div className='container mx-auto bg-white rounded-lg border shadow-lg p-6 mt-4'>

        <div className="w-full space-y-4 p-8">
            <h2 className="text-3xl font-bold tracking-tight">Partners</h2>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Search partners..."
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
                  <SelectItem value={"0"}>Inactive</SelectItem>
                  <SelectItem value={"1"}>Active</SelectItem>
                  <SelectItem value={"2"}>Ban</SelectItem>
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
                    <TableHead>Register Date</TableHead>
                    <TableHead>Change Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedpartners.map((partner) => (
                    <TableRow key={partner.id}>
                      
                      <TableCell>{partner.name}</TableCell>
                      <TableCell>{partner.email}</TableCell>
                      <TableCell>{partner.mobile}</TableCell>
                      <TableCell>
                        <Badge variant={partner.status == "0" ? "secondary" : partner.status == "1" ? "success"  :  "destructive" }>
                          {partner.status == 0 ? "Inactive" : partner.status == 1 ? "Active" : "Ban" }
                        </Badge>
                      </TableCell>
                      
                      <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        
                        <Pencil onClick={() => handlePartnerRow(partner.id)} className='w-5' />
                     
                        
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                  
                    {/* Dialog */}
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Partner Status</DialogTitle>
                            {/* <DialogDescription> {selectedPartnerId ? selectedPartnerId : ''}</DialogDescription> */}
                          </DialogHeader>

                          {/* Form inside the Dialog */}
                          <form onSubmit={handleSubmit}>
                            <div>
                            <Select onValueChange={(e:any) => setData('status', e.target.value)} value={data.status}>
                              <SelectTrigger className="w-[240px] mx-auto">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Inactive</SelectItem>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="2">Ban</SelectItem>
                              </SelectContent>
                            </Select>


                            </div>
                            <InputError message={errors.status} className='mt-2'/>
                            <DialogFooter>
                              <Button type="button" onClick={() => setIsOpen(false)}>
                                Cancel
                              </Button>
                              <Button disabled={processing} type="submit">Submit</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>


            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedpartners.length} of {filteredpartners.length} results
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