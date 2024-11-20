import { usePage } from "@inertiajs/react"

export default function Dashboard() {
    const { user } = usePage().props.auth
  return (
    <div>{user.name } Dashboard</div>
  )
}
