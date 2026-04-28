import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, getIP } from '@/lib/rate-limit'

const PLAN_LIMITS: Record<string, number> = {
  starter:   1,
  pro:       3,
  unlimited: 999,
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    const ip = getIP(request)
    const { success } = await rateLimit(ip, 'verify-payment', 10, 60)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, menu_id } =
      await request.json()

    // ── HMAC-SHA256 Signature Verification ───────────────────────────────────
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // ── Update payment record to verified ────────────────────────────────────
    await supabase
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'verified',
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('owner_id', user.id)

    // ── Upsert subscription ───────────────────────────────────────────────────
    const now = new Date()
    const periodEnd = new Date(now)
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    const { error: subError } = await supabase.from('subscriptions').upsert(
      {
        owner_id: user.id,
        plan,
        menu_limit: PLAN_LIMITS[plan] ?? 1,
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
      },
      { onConflict: 'owner_id' }
    )

    if (subError) throw subError

    // ── Activate the menu ─────────────────────────────────────────────────────
    if (menu_id) {
      await supabase
        .from('menus')
        .update({ is_active: true, updated_at: now.toISOString() })
        .eq('id', menu_id)
        .eq('owner_id', user.id)
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('POST /api/payments/verify error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
