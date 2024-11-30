import Guest from "@/Layouts/GuestLayout"
import {Head} from "@inertiajs/react"


export default function NotFound404() {
  return (
        <Guest>
            <Head title="404 Not Found" />
                <div className="w-9/12 m-auto py-6 flex items-center justify-center">
                
                <div className=" text-center pt-8">
                <h1 className="text-9xl font-bold text-amber-400">404</h1>
                <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
                <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                <button className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-semibold px-6 py-3 rounded-md mr-6">
                HOME
                </button>
                <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500  text-white font-semibold px-6 py-3 rounded-md">
                Contact Us
                </button>
                </div>
                </div>

    </Guest>
  )
}
