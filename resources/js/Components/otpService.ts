// services/smsService.ts
import axios from 'axios';

interface SmsRequestOptions {
  sender: string;
  mobileno: string;
  template: string;
  otpLength: number;
}

export const sendOtp = async ({
  sender,
  mobileno,
  template,
  otpLength
}: SmsRequestOptions): Promise<any> => {
  const apikey = "673323ee818d7"; 
  if (!apikey) {
    throw new Error('API key not found');
  }

  const apiUrl = `https://www.smsalert.co.in/api/mverify.json`;

  const formattedTemplate = template.replace('[otp length="6"]', `[otp length="${otpLength}"]`);

  const params = new URLSearchParams({
    apikey,
    sender,
    mobileno,
    template: formattedTemplate
  });

  try {
    const response = await axios.post(apiUrl, params);
    return response.data;
  } catch (error:any) {
    throw new Error('Error sending OTP: ' + error.message);
  }
};
