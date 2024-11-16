import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { CheckoutPage } from "@/components/checkout-page";
import {usePage} from "@inertiajs/react";
import UserEmailLoginForm from "@/components/userEmailLoginForm";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <Guest>
            <Head title="checkout" />
                
                    

                        {user? <CheckoutPage />: <div className="mx-auto justify-center my-5 md:p-5 bg-white max-w-md shadow-lg rounded-lg min-h-[400px]"><UserEmailLoginForm /></div>}
                    
               
            

        </Guest>
    );
}
