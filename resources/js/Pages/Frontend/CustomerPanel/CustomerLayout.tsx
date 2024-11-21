import { PropsWithChildren } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import { Link, usePage } from "@inertiajs/react"

import { Separator } from '@/components/ui/separator';

export default function CustomerLayout({ children }: PropsWithChildren) {
      const user:any = usePage().props.auth.user;
  return (
   
    <div className='flex max-w-7xl flex-col md:flex-row mx-auto p-3 gap-3'>
        <div className='w-full md:w-1/4 px-2'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg md:text-xxl font-bold text-center'>Welcome {user.name}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col p-2'>
                        <Link href={route('customer.account')}>
                        <b>Dashboard</b> 
                        </Link>
                    </div>
                    <Separator />

                    <div className='flex flex-col p-2'>
                        <Link href={route('customer.orders')}>
                                <b>Orders</b> 
                        </Link>
                    </div>
                    <Separator />

                    <div className='flex flex-col p-2'>
                        <Link href={route('customer.profile')}>
                                <b>Profile</b> 
                        </Link>
                    </div>
                    <Separator />

                    

                </CardContent>
                <CardFooter>
                    <div className='flex flex-col p-2'>
                        <Link href={route('logout')}>
                                <b>Logout</b> 
                        </Link>
                    </div>
                </CardFooter>
            </Card>


            

            
        </div>
      <main className="flex-1 px-2">
        {children}
      </main>
    </div>


  )
}
