// global.d.ts

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void; // Specify the exact structure of the response object
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
    };
    theme: {
      color: string;
    };
  }
  
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
  
  interface RazorpayInstance {
    open(): void;
  }
  