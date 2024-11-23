"use client"

import { FormEventHandler, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BasicInformation } from "./BasicInformation"
import { PricingAndInventory } from "./PricingAndInventory"
import { Media } from "./Media"
import { DimensionsAndShipping } from "./DimensionsAndShipping"
import { AdvancedOptions } from "./AdvancedOptions"
import { useForm } from "@inertiajs/react"
import { Inertia } from "@inertiajs/inertia"

type ProductFormData = {
productName: string
  slug: string
  description: string
  content: string
  status: string
  sku: string
  price: number
  sale_price: number
  start_date: string
  end_date: string
  quantity: number
  allow_checkout_when_out_of_stock: boolean
  with_storehouse_management: boolean
  stock_status: string
  images: FileList
  video_media: FileList
  image: FileList
  length: number
  wide: number
  height: number
  weight: number
  brand_id: string
  tax_id: string
  is_featured: boolean
  product_type: string
  barcode: string
  cost_per_item: number
  generate_license_code: boolean
  minimum_order_quantity: number
  maximum_order_quantity: number
}

export function ProductAddForm() {
  const [activeTab, setActiveTab] = useState("basic")

  const { data, setData, post, errors, processing, reset} = useForm({
    productName: "",
    slug: "",
    description: "",
    content: "",
    status: "active",
    category: "",
    sku: "",
    price: 0,
    sale_price: 0,
    start_date: "",
    end_date: "",
    quantity: 0,
    allow_checkout_when_out_of_stock: false,
    with_storehouse_management: false,
    stock_status: "in_stock",
    images: [],
    video_media: [],
    image: null,
    length: 0,
    wide: 0,
    height: 0,
    weight: 0,
    brand_id: "",
    tax_id: "",
    is_featured: false,
    product_type: "simple",
    barcode: "",
    cost_per_item: 0,
    generate_license_code: false,
  });

  const handleSubmit :FormEventHandler  = (e) => {
    e.preventDefault()

    console.log("Form Data:", data)

    // Here you would typically send the data to your backend
    // For example, you could use the `post` function from the useForm hook
    // to submit the form data to the server
    post(route('products.store'), {
      onFinish: () => {
        reset('productName',)

      }
      
      
    })
  }

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "pricing", label: "Pricing & Inventory" },
    { id: "media", label: "Media" },
    { id: "dimensions", label: "Dimensions & Shipping" },
    { id: "advanced", label: "Advanced Options" },
  ]

  return (
    
      <form onSubmit={handleSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="basic">
            <BasicInformation data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingAndInventory data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="media">
            <Media data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="dimensions">
            <DimensionsAndShipping data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="advanced">
            <AdvancedOptions data={data} setData={setData} />
          </TabsContent>
        </Tabs>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1].id)
              }
            }}
            disabled={activeTab === tabs[0].id}
          >
            Previous
          </Button>
          <Button
            type={activeTab === tabs[tabs.length - 1].id ? "submit" : "button"}
            onClick={() => {
              const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
              if (currentIndex < tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1].id)
              }
            }}
          >
            {activeTab === tabs[tabs.length - 1].id ? "Submit" : "Next"}
          </Button>
        </div>
      </form>

  )
}

