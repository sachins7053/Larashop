import { usePage } from "@inertiajs/react"

export default function OrderDetails() {
    const { user } = usePage().props.auth
  return (
    <div>{user.name } OrderDetails</div>
  )
}
