import { Inertia } from '@inertiajs/inertia';
import { Button } from '../ui/button'

export default function Template() {

    const downloadCsv = () => {
        Inertia.visit(route('download.csv'));
    }
  return (
    <div className='mx-auto p-4'>
        <Button onClick={downloadCsv} variant={'dark'} size={'lg'}>Download Template</Button>
    </div>
  )
}
