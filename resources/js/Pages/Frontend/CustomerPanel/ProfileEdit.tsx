import { usePage } from "@inertiajs/react"
import CustomerLayout from "./CustomerLayout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Guest from "@/Layouts/GuestLayout"

export default function ProfileEdit() {
    const  user  = usePage().props.auth.user
  return (
      <Guest>
        <CustomerLayout>

              <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Update Profile Details</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={user.name} type="text" placeholder="Enter Your Name" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user.email} type="email" placeholder="Enter Your Email"  required/>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="mobile">Mobile No.</Label>
                            <Input id="mobile" value='' type="tel" placeholder="Enter your Mobile Number" required/>
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="mobile">Mobile No.</Label>
                            <Input id="mobile" type="tel" placeholder="Name of your project" required/>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      
                      <Button variant='dark' >Update</Button>
                    </CardFooter>
                  </Card>

        </CustomerLayout>
        </Guest>
  )
}
