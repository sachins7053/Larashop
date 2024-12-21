import Guest from "@/Layouts/GuestLayout"
import { Head } from "@inertiajs/react"


export default function Page({page}:any) {
  return (
    <Guest>
        <Head title ={page.title} />
        <div className="container mx-auto p-4 mt-12 space-y-5">
          <h1 className="text-lg font-bold">
              {page.title}
          </h1>
        </div>
    </Guest>
  )
}

