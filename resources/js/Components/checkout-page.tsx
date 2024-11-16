import { useState} from 'react'
import { ShoppingCart, CreditCard, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

declare namespace NodeJS {
  interface ProcessEnv {
    INDIAN_CURRENCY: string; 
  }
}

export function CheckoutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const {data, setData, post, processing, errors, reset} = useForm({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    state: '',
    pincode: '',
  })

  const handleCheckout :FormEventHandler = (e) =>{
    e.preventDefault()

    post(route('checkout'), {
      onSuccess: () => reset('address','email','firstName','lastName','mobileNumber','pincode','state')
    })
  }


  const Currency = process.env.CURRENCY;

  const cartItems = [
    { id: 1, name: 'Premium Headphones', price: 199.99, quantity: 1 },
    { id: 2, name: 'Wireless Mouse', price: 49.99, quantity: 2 },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const discount = appliedCoupon ? 20 : 0 // Assuming a flat $20 discount for simplicity
  const total = subtotal + tax - discount

  const handleCouponApply = () => {
    setAppliedCoupon(couponCode)
    setCouponCode('')
  }

  const handleCouponRemove = () => {
    setAppliedCoupon(null)
  }


  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                    <p>Enter your Billing & Shipping details</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
              
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => setData('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) => setData({...data, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({...data, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={data.mobileNumber}
                      onChange={(e) => setData({...data, mobileNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={data.address}
                      onChange={(e) => setData({...data, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => setData({...data, state: value})}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={data.pincode}
                        onChange={(e) => setData({...data, pincode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer">Bank Transfer</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  Cart Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{Currency}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal</span>
                  <span>{Currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Tax</span>
                  <span>{Currency}{ tax.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-{Currency}{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>{Currency}{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  {appliedCoupon ? (
                    <div className="flex justify-between items-center">
                      <span>Coupon applied: {appliedCoupon}</span>
                      <Button variant="destructive" size="sm" onClick={handleCouponRemove}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Label htmlFor="coupon">Coupon Code</Label>
                      <div className="flex">
                        <Input
                          id="coupon"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="mr-2"
                        />
                        <Button onClick={handleCouponApply}>Apply</Button>
                      </div>
                    </>
                  )}
                  <Button onClick={handleCheckout} className="w-full">
                    Place Order
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
   
  )
}