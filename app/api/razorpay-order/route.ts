// app/api/razorpay-order/route.ts
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// Ensure the environment variables are defined
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay key_id and key_secret must be defined in the environment variables.");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string, // Type assertion to avoid 'string | undefined' error
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Razorpay order creation failed" },
      { status: 500 }
    );
  }
}
