import * as React from "react"
import { MinusIcon, PlusIcon, ShoppingCart, X } from "lucide-react"
import { toast } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CartData, CartManager } from "@/hooks/CartManager"
import { Cart } from "./Cart"

interface CartItem {
  id: string
  name: string
  price: number
  color: string
  quantity: number
  image: string
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  content: string;
  sale_price: number;
  images : string | Blob | null;

  // Add more fields based on your Product model
}
interface ProductPageProps {
  productData: ProductData; // Define productData as part of the props
}

export function ProductPage({ productData }: ProductPageProps){
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [selectedColor, setSelectedColor] = React.useState("grey")
  const [quantity, setQuantity] = React.useState(1)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [pincode, setPincode] = React.useState("")
  const [deliveryInfo, setDeliveryInfo] = React.useState<string | null>(null)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)

  const images = [
    "https://images.woodenstreet.de/image/cache/data%2Fbed-with-storage%2Fwalken-bed-with-storage%2Fupdated%2Fupdated%2Fwalnut%2Fnew-logo%2Ffront-walnutt-810x702.jpg",
    "https://images.woodenstreet.de/image/cache/data%2Fbed-with-storage%2Fwalken-bed-with-storage%2Fupdated%2Fupdated%2Fwalnut%2Fnew-logo%2F1-810x702.jpg",
    "https://images.woodenstreet.de/image/cache/data%2Fbed-with-storage%2Fwalken-bed-with-storage%2Fupdated%2Fupdated%2Fwalnut%2Fnew-logo%2F3-810x702.jpg",
    "https://images.woodenstreet.de/image/cache/data%2Fbed-with-storage%2Fwalken-bed-with-storage%2Fupdated%2Fupdated%2Fwalnut%2F4-810x702.jpg",
  ]

  const colors = [
    { name: "Grey", value: "grey" },
    { name: "Blue", value: "blue" },
    { name: "White", value: "white" },
    { name: "Brown", value: "brown" },
  ]

  const sections = {
    overview: {
      title: "Overview",
      content: "Modern table lamp with wooden base and fabric shade...",
    },
    merchantDetails: {
      title: "Merchant Details",
      content: "Sold and fulfilled by Premium Lighting Store...",
    },
    careInstructions: {
      title: "Care & Instructions",
      content: "Clean with soft, dry cloth. Avoid harsh chemicals...",
    },
    deliveryInstallation: {
      title: "Delivery & Installation",
      content: "Free delivery within 5-7 business days...",
    },
    warranty: {
      title: "Warranty",
      content: "1 year manufacturer warranty on electrical components...",
    },
    termsConditions: {
      title: "Terms And Conditions",
      content: "Standard terms and conditions apply...",
    },
    faqs: {
      title: "FAQ's",
      content: "Frequently asked questions about the product...",
    },
    disclaimer: {
      title: "Disclaimer",
      content: "Product colors may vary slightly from images shown...",
    },
  }

  const handleAddToCart = () => {
      const item: CartData = {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        quantity: quantity,
        image: images[0],
        color: selectedColor,
      }
  
      CartManager.addItem(item);
      setCartOpen(true)
    };
  



  const checkDelivery = () => {
    // Simulate delivery check
    if (pincode.length === 6) {
      setDeliveryInfo("Delivery available in 5-7 business days")
      toast.success("Delivery available in your area!")
    } else {
      setDeliveryInfo("Please enter a valid pincode")
      toast.error("Please enter a valid pincode")
    }
  }



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
                <img
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <img
              src={images[selectedImage]}
              alt="Main product image"
              className="object-cover shadow-lg rounded-lg"
              
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <p className="text-xl font-semibold">₹{productData.price}</p>
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

          <div className="space-y-2">
            <Label>Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(q => q + 1)}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
            <Button onClick={handleAddToCart} variant="secondary" className="flex-1">
              Buy Now
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Check Delivery</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Pincode"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                maxLength={6}
              />
              <Button onClick={checkDelivery} variant="outline">
                Check
              </Button>
            </div>
            {deliveryInfo && (
              <p className="text-sm text-muted-foreground">{deliveryInfo}</p>
            )}
          </div>

          <Separator className="my-4" />

          <Accordion type="single" collapsible>
            {Object.entries(sections).map(([key, section]) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>{section.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
         <Cart />
        </SheetContent>
      </Sheet>
    </div>
  )
}