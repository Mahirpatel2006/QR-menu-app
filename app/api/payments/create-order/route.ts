import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, getIP } from '@/lib/rate-limit'

const PLAN_CONFIG: Record<string, { amount: number; menu_limit: number; label: string }> = {
  starter: { amount: 5000,  menu_limit: 1,         label: 'Starter — 1 Menu'     }, // ₹50
  pro:     { amount: 10000, menu_limit: 3,         label: 'Pro — Up to 3 Menus'  }, // ₹100
  unlimited:{ amount: 20000,menu_limit: 999,       label: 'Unlimited Menus'       }, // ₹200
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const ip = getIP(request)
    const { success } = await rateLimit(ip, 'create-order', 5, 60)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await request.json()

    const planConfig = PLAN_CONFIG[plan]
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await razorpay.orders.create({
      amount: planConfig.amount,
      currency: 'INR',
      receipt: `receipt_${user.id.slice(0, 8)}_${Date.now()}`,
    })

    // Record pending payment in DB
    const { error: paymentError } = await supabase.from('payments').insert({
      owner_id: user.id,
      razorpay_order_id: order.id,
      amount: planConfig.amount,
      currency: 'INR',
      status: 'pending',
    })

    if (paymentError) throw paymentError

    return NextResponse.json({
      orderId: order.id,
      amount: planConfig.amount,
      currency: 'INR',
      plan,
      planLabel: planConfig.label,
    })
  } catch (error: unknown) {
    console.error('POST /api/payments/create-order error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
