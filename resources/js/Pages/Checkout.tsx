import { CheckoutPage } from "@/components/checkout-page";
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    return (
        <>
            <CheckoutPage />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <Button>Profile</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
