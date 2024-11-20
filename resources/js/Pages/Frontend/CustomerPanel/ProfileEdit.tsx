import { usePage } from "@inertiajs/react"

export default function ProfileEdit() {
    const { user } = usePage().props.auth
  return (
    <div>{ user.name } ProfileEdit</div>
  )
}
