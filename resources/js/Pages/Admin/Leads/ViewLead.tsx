import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormEventHandler, useEffect } from 'react';
import InputError from '@/components/InputError';
import { toast } from '@/hooks/use-toast';


export default function EditLead(){
    const leadData :any = usePage().props.lead
    const role :any = usePage().props.auth.roles

    const lead = leadData[0]
    const notes = lead.notes

  useEffect(() =>{

    console.log(role)
  console.log(lead)
  },[])
  
  const { data, setData, post, processing, errors, reset } = useForm({
    lead_id: lead.id,
    note: '',
});

  const handleSubmit :FormEventHandler = (e) => {
    e.preventDefault()

    post(route('leads.Note', {id: lead.id}), {
      onFinish: () => { 
        
        reset('note')
        toast({
          variant: "success",
          title: "Your Note has been Added",
        })
      },
  })


  }
  return (
    <AuthenticatedLayout 
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Lead Details
        </h2>
    }
    >
    <Head title="Enquiry Details" />
      <div className='container flex flex-col sm:flex-row justify-center gap-4 mx-auto p-4'>
        <div className="basis-2/3 p-4 mb-4 bg-white rounded-lg shadow-lg w-full">
            <div className='flex flex-col sm:flex-row w-full'>
                <div className='w-full'>
                {role.includes('Admin') && (

                  <div className="w-full">
                  <h2 className='text-xl font-bold'>Channel partner </h2>
                  <p><b> Partner Name: </b> {lead.name}</p>
                  <p><b> Partner Mobile: </b> {lead.mobile? lead.mobile:'Not Available'}</p>
                </div>
                )}
              </div>
              <div className='w-full'>
                  
                  <h2 className='text-xl font-bold'>Customer Details </h2>
                      <p><b> Customer Name: </b>  {lead.customer_name} </p>
                      <p><b> Customer Email: </b>  {lead.customer_email} </p>
                      <p><b> Customer Mobile: </b>  {lead.mobile_no } </p>
            
                  
              </div>
            </div>
            <div className="w-full">
                  <h2 className='text-xl font-bold'>Enquiry Message </h2>
                    <p>{lead.lead_details}</p>
                  </div>
        </div>
        <div className="w-full basis-1/3 p-4 mb-4 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>  
              <Label className='text-lg' htmlFor="reply">Add Notes</Label>
                <Textarea 
                  id="reply"
                  placeholder="Add Notes"
                  name="note"
                  rows={6}
                  className="w-full p-4 mb-4 rounded-lg shadow-lg"
                  value={data.note}
                  onChange={(e) => setData({ ...data, note: e.target.value })}
                />
                <InputError message={errors.note} className='mt-2' />
                <Button disabled={processing} type="submit" className="w-full">Submit Enquiry</Button>
            </form>
        </div>
      </div>
      {notes.length > 0 && (
        <div className='container w-full rounded-lg shadow-lg p-4 mt-4 border bg-white mx-auto'>
            <h2 className='text-lg font-bold'>Enquiry Notes</h2>
           
            {notes.map((note:any) => (
              <div className="w-full flex justify-between py-1 px-2 my-2 bg-blue-100 rounded-md text-blue-500">
                <p className="text-lg font-bold">{note.note}</p>
                <p className="text-md text-gray-500">{new Date(note.updated_at).toLocaleDateString()} {new Date(note.updated_at).toLocaleTimeString()}</p>
              </div>
            ))}
            
           
        </div>
        
      )}
      

    </AuthenticatedLayout>
  )
}