import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json(); // Get the amount from the request body

    // Create an order using Razorpay
    const options = {
      amount: amount * 100, // amount in paise (e.g., 5000 => ₹50.00)
      currency: 'INR',
      receipt: 'order_rcptid_11', // Optional receipt id
    };

    const order = await razorpay.orders.create(options);

    // Return the order details as a response
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
