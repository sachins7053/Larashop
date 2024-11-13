import { useState } from 'react'
import { sendOtp } from './otpService'
import { Phone, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function MobileOtpLogin() {
  const [mobileno, setMobileNumber] = useState('')
  const [otpLength, setOtpLength] = useState<number>(10);
  const [otp, setOtp] = useState('')
  const [showOtpField, setShowOtpField] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!mobileno || mobileno.length < 10) {
      setError('Please enter a valid mobile number')
      return
    }
    try {

      const sender = 'CVDEMO';
      const template = 'Hello Ravi, Your OTP is [otp length="6"]';

      const response = await sendOtp({
        sender,
        mobileno,
        template,
        otpLength
      });
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(response)
      console.log(response.data)
      setShowOtpField(true)
      
      console.log('OTP sent to', mobileno)
    } catch (err) {
      console.error(err)
      setError('Failed to send OTP. Please try again.')
    }
  }

  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP')
      return
    }
    try {
      // Simulating an API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real application, you would call your API to verify the OTP here
      console.log('OTP verified for', mobileno)
      // Handle successful login (e.g., redirect to dashboard)
    } catch (err) {
      setError('Invalid OTP. Please try again.')
    }
  }

  return (
    <Card className="w-full shadow-none border-none border-0 mx-auto">
      <CardHeader>
        <CardTitle>Login with Mobile</CardTitle>
        <CardDescription>Enter your mobile number to receive an OTP</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={showOtpField ? handleSubmitOtp : handleSendOtp}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +91
                </span>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileno}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="rounded-l-none"
                  required
                  disabled={showOtpField}
                />
              </div>
            </div>
            {showOtpField && (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
          <CardFooter className="flex justify-end p-0 pt-4">
            <Button type="submit">
              {showOtpField ? 'Submit OTP' : 'Send OTP'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}