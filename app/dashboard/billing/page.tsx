import { createClient } from '@/lib/supabase/server'
import { CreditCard, Zap, Star, Infinity } from 'lucide-react'
import { BillingClient } from './BillingClient'
import Image from 'next/image'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 50,
    menus: '1 Menu',
    icon: Zap,
    color: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-500',
    features: ['1 digital menu', 'Unlimited QR scans', 'Custom themes', 'Basic support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 100,
    menus: 'Up to 3 Menus',
    icon: Star,
    color: 'from-primary/10 to-[#FDDDD8]',
    iconColor: 'text-primary',
    popular: true,
    features: ['Up to 3 digital menus', 'Unlimited QR scans', 'Custom themes', 'Priority support'],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 200,
    menus: 'Unlimited Menus',
    icon: Infinity,
    color: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-500',
    features: ['Unlimited digital menus', 'Unlimited QR scans', 'Custom themes', 'Premium support'],
  },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, menu_limit, current_period_end, status')
    .eq('owner_id', user!.id)
    .eq('status', 'active')
    .maybeSingle()

  const currentPlan = subscription?.plan ?? null
  const renewalDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-8 sm:p-10 rounded-[2.5rem] border border-[#EDE8E0] shadow-sm overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <h1 className="text-4xl font-bold font-display text-[#1C1410]">Billing & Plans</h1>
          <p className="text-[#6B635A] mt-3 text-lg leading-relaxed">Choose the plan that fits your business. Scale your digital menu experience anytime.</p>
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-40 h-40 relative hidden sm:block drop-shadow-2xl">
            <Image 
              src="/subscription02.svg" 
              alt="Subscription decoration" 
              fill
              className="object-contain"
            />
          </div>
          <div className="w-32 h-32 relative opacity-20 absolute -right-10 -top-10 lg:static lg:opacity-100 hidden sm:block">
             <Image src="/subscription01.svg" alt="Billing" fill className="object-contain" />
          </div>
        </div>
      </div>

      {currentPlan && (
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm relative">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FDDDD8] rounded-xl flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-[#1C1410] capitalize">Current plan: {currentPlan}</div>
              {renewalDate && <div className="text-sm text-[#6B635A]">Renews on {renewalDate}</div>}
            </div>
          </div>
          <span className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 sm:ml-auto text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full w-fit">Active</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const Icon = plan.icon
          const isCurrent = plan.id === currentPlan
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all
                ${plan.popular ? 'border-primary shadow-hover' : 'border-[#EDE8E0]'}
                ${isCurrent ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-xs font-bold text-center py-1.5 tracking-wider">
                  MOST POPULAR
                </div>
              )}
              <div className={`bg-gradient-to-br ${plan.color} p-6`}>
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-[#1C1410]">{plan.name}</h3>
                <p className="text-sm text-[#6B635A]">{plan.menus}</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-[#1C1410] mb-1">
                  ₹{plan.price}
                  <span className="text-base font-normal text-[#6B635A]">/mo</span>
                </div>
                <ul className="mt-4 space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#6B635A]">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="w-full text-center text-sm font-semibold text-green-700 bg-green-50 rounded-xl py-3">
                    ✓ Current Plan
                  </div>
                ) : (
                  <BillingClient plan={plan.id} label={`Get ${plan.name}`} popular={plan.popular} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
