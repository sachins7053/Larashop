
import Guest from "@/Layouts/GuestLayout"
import { usePage, Link } from "@inertiajs/react"
import CustomerLayout from "./CustomerLayout"

export default function Dashboard() {
    const { user } = usePage().props.auth
  return (
    <Guest>
        <CustomerLayout>
          <div>{user.name } Dashboard</div>

        </CustomerLayout>
    </Guest>
  )
}
