import * as React from "react"
import Image from "next/image"
import { MinusIcon, PlusIcon, ShoppingCart, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: string
  name: string
  price: number
  color: string
  quantity: number
  image: string
}

export function ProductPage() {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [selectedColor, setSelectedColor] = React.useState("grey")
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])

  const images = [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const colors = [
    { name: "Grey", value: "grey" },
    { name: "Blue", value: "blue" },
    { name: "White", value: "white" },
    { name: "Brown", value: "brown" },
  ]

  const addToCart = () => {
    const newItem = {
      id: `lamp-${selectedColor}`,
      name: "Modern Table Lamp",
      price: 379,
      color: selectedColor,
      quantity: 1,
      image: images[0],
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, newItem]
    })

    setCartOpen(true)
    toast.success("Added to cart!")
  }

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change
          return newQuantity > 0
            ? { ...item, quantity: newQuantity }
            : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {images.map((src, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="object-cover"
                  fill
                />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt="Main product image"
              className="object-cover"
              fill
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Modern Table Lamp</h1>
            <p className="text-xl font-semibold">₹379</p>
          </div>

          <div className="space-y-2">
            <Label>Select Color</Label>
            <RadioGroup
              defaultValue={selectedColor}
              onValueChange={setSelectedColor}
              className="flex gap-2"
            >
              {colors.map(color => (
                <div key={color.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={color.value}
                    id={color.value}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={color.value}
                    className="rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                  >
                    {color.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={addToCart} className="mt-4">
            Add to Cart
          </Button>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h2 className="font-semibold">Product Details</h2>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material</span>
                <span>Wood, Fabric</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions</span>
                <span>H: 45cm, W: 25cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assembly Required</span>
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 overflow-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart to see them here
                </p>
              </div>
            ) : (
              cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Color: {item.color}
                    </p>
                    <p className="font-medium">₹{item.price}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button className="mt-4 w-full">Checkout</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}