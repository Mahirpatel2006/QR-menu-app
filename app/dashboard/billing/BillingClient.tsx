"use client"

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

// Global Razorpay injected via script

interface BillingClientProps {
  plan: string
  label: string
  popular?: boolean
}

export function BillingClient({ plan, label, popular }: BillingClientProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // 1. Create order server-side
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { orderId, amount, currency, planLabel, error } = await res.json()
      if (error) throw new Error(error)

      // 2. Load Razorpay script dynamically
      if (!(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Razorpay'))
          document.body.appendChild(script)
        })
      }

      // 3. Open Razorpay checkout
      const rzp = new (window as any).Razorpay({
        key: process.env.RAZORPAY_KEY_ID || '',
        amount,
        currency,
        name: 'Click2Menu',
        description: planLabel,
        order_id: orderId,
        handler: async (response: any) => {
          // 4. Verify payment server-side
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan,
            }),
          })
          const { success, error: verifyError } = await verifyRes.json()
          if (success) {
            toast.success('Payment successful! Your plan has been upgraded.')
            
            const pendingMenu = sessionStorage.getItem('pendingMenu')
            if (pendingMenu) {
              toast.loading('Creating your menu...', { id: 'menu-create' })
              try {
                const menuRes = await fetch('/api/menus', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: pendingMenu,
                })
                if (menuRes.ok) {
                  sessionStorage.removeItem('pendingMenu')
                  toast.success('Menu created successfully!', { id: 'menu-create' })
                  router.refresh()
                  router.push('/dashboard/qr')
                  return
                }
              } catch (e) {
                console.error('Pending menu creation failed:', e)
                toast.error('Plan upgraded, but menu creation failed. Please try again.', { id: 'menu-create' })
              }
            }

            window.location.reload()
          } else {
            toast.error(verifyError || 'Payment verification failed')
          }
        },
        theme: { color: '#F57363' },
      })
      rzp.open()
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all text-sm
        ${popular
          ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-hover'
          : 'bg-[#F5F1EB] text-[#1C1410] hover:bg-[#EDE8E0]'}
        disabled:opacity-60`}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : label}
    </button>
  )
}
