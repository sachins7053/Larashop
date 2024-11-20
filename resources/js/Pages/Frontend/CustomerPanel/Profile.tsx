import { usePage } from "@inertiajs/react"

export default function Profile() {
    const { auth } = usePage().props.auth
  return (
    <div>{auth.name }Profile</div>
  )
}