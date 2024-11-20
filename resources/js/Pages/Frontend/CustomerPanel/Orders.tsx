import { usePage } from "@inertiajs/react"

export default function Orders() {
    const { auth } = usePage().props.auth
  return (
    <div>{auth.name}Orders</div>
  )
}
