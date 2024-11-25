import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ProductAddForm } from '@/components/ProductAddForm/ProductAddForm'



export default function AddNewProduct() {

  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Product
                </h2>
            }
        >
            <Head title="Add New Product" />
            <div className="max-w-4xl mx-auto p-4 my-4 rounded-lg shadow-sm bg-white">

            <ProductAddForm />
            </div>
            
    </AuthenticatedLayout>
  )
}
