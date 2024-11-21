import { useState } from 'react'
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
import { usePage } from '@inertiajs/react'
import InputError from './InputError'
import { toast } from '@/hooks/use-toast'

declare namespace NodeJS {
  interface ProcessEnv {
    CURRENCY: string; 
  }
}

export function CheckoutPage() {
  const Currency: any = usePage().props.env
  const cartItems: any = usePage().props.cart
  const user: any = usePage().props.auth.user
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const subtotal = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const discount = appliedCoupon ? 20 : 0 // Assuming a flat $20 discount for simplicity
  const total = subtotal + tax - discount
  const [couponCode, setCouponCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const { data, setData, post, processing, errors, reset } = useForm({
    firstName: `${user.name}`,
    lastName: '',
    email: `${user.email}`,
    phone: '',
    address: '',
    state: '',
    pincode: '',
    city: '',
    country: '',
    paymentMethod: '',
    totalamount: total,
  })

  const handleCheckout: FormEventHandler = (e) => {
    e.preventDefault()

    // Clear previous errors
    const newErrors: any = {}

    // Check for required fields
    if (!data.firstName) newErrors.firstName = "First Name is required"
    if (!data.lastName) newErrors.lastName = "Last Name is required"
    if (!data.email) newErrors.email = "Email is required"
    if (!data.phone) newErrors.phone = "Mobile Number is required"
    if (!data.address) newErrors.address = "Address is required"
    if (!data.state) newErrors.state = "State is required"
    if (!data.pincode) newErrors.pincode = "Pincode is required"
    if (!paymentMethod) newErrors.paymentMethod = "Payment Method is required"

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach((key) => {
        setData((prev: any) => ({ ...prev, [key]: prev[key] })); // Update the form data to reflect validation errors
      });
      return;
    }

    try {
      post(route('checkout', { userid: user.id }), {
        onFinish: () => {
          reset('address', 'email', 'firstName', 'lastName', 'phone', 'pincode', 'state')
          toast({
            variant: "success",
            title: "Your Order has been placed successfully",
          })
        },
        onError: (errors) => {
          Object.keys(errors).forEach((key: any) => {
            setData((prev: any) => ({ ...prev, [key]: prev[key] }));
          });
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error in creating order",
      })
      console.error(error)
    }
  }

  const handleCouponApply = () => {
    setAppliedCoupon(couponCode)
    setCouponCode('')
  }

  const handleCouponRemove = () => {
    setAppliedCoupon(null)
 
  }

  // Function to check if the form is valid
  const isFormValid = () => {
    return data.firstName && data.lastName && data.email && data.phone && data.address && data.state && data.pincode && paymentMethod;
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      {
        cartItems.length > 0 ? (
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
                          type="text"
                          name="firstname"
                          value={data.firstName}
                          onChange={(e) => setData('firstName', e.target.value)}
                          required
                        />
                        <InputError message={errors.firstName} />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          name="lastname"
                          value={data.lastName}
                          onChange={(e) => setData({ ...data, lastName: e.target.value })}
                          required
                        />
                        <InputError message={errors.lastName} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                      />
                      <InputError message={errors.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        required
                      />
                      <InputError message={errors.phone} />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                        required
                      />
                      <InputError message={errors.address} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select name="state" defaultValue='Delhi' onValueChange={(value) => setData({ ...data, state: value })}>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                              <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                              <SelectItem value="Assam">Assam</SelectItem>
                              <SelectItem value="Bihar">Bihar</SelectItem>
                              <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Goa">Goa</SelectItem>
                              <SelectItem value="Gujarat">Gujarat</SelectItem>
                              <SelectItem value="Haryana">Haryana</SelectItem>
                              <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                              <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Kerala">Kerala</SelectItem>
                              <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="Manipur">Manipur</SelectItem>
                              <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                              <SelectItem value="Mizoram">Mizoram</SelectItem>
                              <SelectItem value="Nagaland">Nagaland</SelectItem>
                              <SelectItem value="Odisha">Odisha</SelectItem>
                              <SelectItem value="Punjab">Punjab</SelectItem>
                              <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                              <SelectItem value="Sikkim">Sikkim</SelectItem>
                              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                              <SelectItem value="Telangana">Telangana</SelectItem>
                              <SelectItem value="Tripura">Tripura</SelectItem>
                              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                              <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                              <SelectItem value="West Bengal">West Bengal</SelectItem>

                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                        <InputError message={errors.state} />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          type="number"
                          name='pincode'
                          value={data.pincode}
                          onChange={(e) => setData({ ...data, pincode: e.target.value })}
                          required
                        />
                        <InputError message={errors.pincode} />
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
                  <RadioGroup  value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Cash On Delivery" id="Cash_on_Delivery" />
                      <Label htmlFor="Cash_on_Delivery">Cash On Delivery</Label>
                    </div>
                    
                  </RadioGroup>
                  <InputError message={errors.paymentMethod} />
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
                  {cartItems.map((item: any) => (
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
                    <span>{Currency}{tax.toFixed(2)}</span>
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
                    <Button type="submit" disabled={processing || !isFormValid()} onClick={handleCheckout} className="w-full">
                      Place Order
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : <h1 className="text-3xl font-bold text-gray-900 mb-8">You Have No Items In Your Cart</h1>
      }
    </div>
  )
}