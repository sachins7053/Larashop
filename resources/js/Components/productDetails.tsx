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
import { usePage } from "@inertiajs/react"

interface CartItem {
  cartId: string
  id: string
  name: string
  price: number
  quantity: number
  image: string
  attribute_name: string; // Field for the attribute name
  attribute_value: string;
}

interface Variation {
  attribute_id: number;
  attribute_name: string;
  variation_id: string;
  product_id: number;
  price: string;
  sale_price: string;
  attribute_value: string;
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  content: string;
  images: string[] | [];
  variations: Variation[];
  price: number | null; // Normal price
  sale_price: number | null; // Sale price
  product_type: string;

  // Add more fields based on your Product model
}
interface ProductPageProps {
  productData: ProductData; // Define productData as part of the props
}

export function ProductDetails({ productData }: ProductPageProps){
  const user  = usePage().props.auth.user
  if (!productData) {
    return <div>Loading...</div>; // or some fallback UI
  }
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [selectedVariation, setSelectedVariation] = React.useState<Variation | null>(null);
  const [quantity, setQuantity] = React.useState(1)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [pincode, setPincode] = React.useState("")
  const [deliveryInfo, setDeliveryInfo] = React.useState<string | null>(null)
  //const [activeSection, setActiveSection] = React.useState<string | null>(null)

  const images :string[] = typeof productData.images === 'string' ? JSON.parse(productData.images) :[]

  const colors = [
    { name: "Grey", value: "grey" },
    { name: "Blue", value: "blue" },
    { name: "White", value: "white" },
    { name: "Brown", value: "brown" },
  ]

  const sections = {
    overview: {
      title: "Overview",
      content: productData.content,
    },

    deliveryInstallation: {
      title: "Delivery & Installation",
      content: "Free delivery within 10-15 business days...",
    },
    termsConditions: {
      title: "Terms And Conditions",
      content: "Standard terms and conditions apply...",
    },
    disclaimer: {
      title: "Disclaimer",
      content: "Product colors may vary slightly from images shown...",
    },
  }

  const handleAddToCart = () => {
    let item: CartData;

    if (productData.product_type === "variable") {
      if (!selectedVariation) {
        toast.error("Please select a variation before adding to cart.");
        return; 
      }
      item = {
        id: productData.id,
        cartId: productData.id + selectedVariation.attribute_value,
        name: productData.name,
        price: parseFloat(selectedVariation.sale_price || "0"), 
        quantity: quantity,
        image: images[0] || "",
        attribute_name: selectedVariation.attribute_name,
        attribute_value: selectedVariation.attribute_value, 
      };
    } else {
      
      item = {
        id: productData.id,
        cartId: productData.id,
        name: productData.name,
        price: parseFloat(productData.sale_price?.toString() || "0"),
        quantity: quantity,
        image: images[0] || "",
        attribute_name: productData.variations[0]?.attribute_name || "Default",
        attribute_value: productData.variations[0]?.attribute_value || "default value",  
      };
    }
   
    user? CartManager.addItem(item, user.id) : CartManager.addItem(item)
    setCartOpen(true);
  };
  



  const checkDelivery = () => {
    // Simulate delivery check
    if (pincode.length === 6) {
      setDeliveryInfo("Delivery available in 10-15 business days")
      toast.success("Delivery available in your area!")
    } else {
      setDeliveryInfo("Please enter a valid pincode")
      toast.error("Please enter a valid pincode")
    }
  }



  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Product Images */}
        <div className="col-span-3 ">
          <div className="flex sticky top-0 gap-4">
            <div className="flex flex-col gap-4">
            {Array.isArray(productData.images) && productData.images.length > 0 ? (
              productData.images.map((src, index) => (
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
            ))
          ) : ''}
          </div>
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <img
                  src={productData?.images == null ? 'https://drive.google.com/uc?id=1Y7U1QRLKCrlzkOB1ExNujr2DjBc_0a7n' : productData.images[selectedImage] }
                  alt="Main product image"
                  className="object-cover shadow-lg rounded-lg"
                  
                />
              </div>
            </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col col-span-2 gap-4">
        <div>
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            {productData.product_type === "variable" ? (
              <p className="text-xl font-semibold">
                {selectedVariation ? `₹${selectedVariation.sale_price}` : `Select a variation`}
              </p>
            ) : (
              <p className="text-xl font-semibold">₹{productData.sale_price}</p>
            )}
            <p className="text-gray-600">{productData.description}</p>
          </div>

          {/* Variations */}
          {productData.product_type === "variable" && (
            <div>
              <h2 className="text-lg font-semibold">Select Variation</h2>
              <RadioGroup value={selectedVariation?.variation_id} onValueChange={(value) => {
                const variation = productData.variations.find(v => v.variation_id.toString() === value);
                setSelectedVariation(variation || null);
              }}>
                {productData.variations.map((variation) => (
                  <div key={variation.variation_id} className="flex items-center">
                    <RadioGroupItem value={variation.variation_id.toString()} id={`variation-${variation.variation_id}`} />
                    <Label htmlFor={`variation-${variation.variation_id}`} className="ml-2">
                      {variation.attribute_value} - ₹{variation.sale_price}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

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
            <Button onClick={handleAddToCart} variant="dark" className="flex-1">
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