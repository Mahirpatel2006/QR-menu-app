import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PlusCircle, UtensilsCrossed, CreditCard, ExternalLink, Eye } from 'lucide-react'
import Image from 'next/image'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: menus }, { data: subscription }, { count: totalScans }] = await Promise.all([
    supabase
      .from('menus')
      .select('id, is_active, restaurants(name)')
      .eq('owner_id', user!.id),
    supabase
      .from('subscriptions')
      .select('plan, menu_limit, current_period_end, status')
      .eq('owner_id', user!.id)
      .eq('status', 'active')
      .maybeSingle(),
    supabase
      .from('menu_views')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user!.id)
  ])

  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'Chef'
  const activeMenus = menus?.filter(m => m.is_active).length ?? 0
  const totalMenus = menus?.length ?? 0
  const plan = subscription?.plan ?? 'Free'
  const menuLimit = subscription?.menu_limit ?? 1
  const renewalDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'N/A'

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#1C1410]">
          Welcome back, {name}! 👋
        </h1>
        <p className="text-[#6B635A] mt-1 text-sm sm:text-base">Here&apos;s what&apos;s happening with your menus today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FDDDD8] rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-[#6B635A]">Active Menus</span>
          </div>
          <div className="text-3xl font-bold text-[#1C1410]">{activeMenus}</div>
          <div className="text-sm text-[#A09588] mt-1">{totalMenus} total / {menuLimit} allowed</div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-[#6B635A]">Total Scans</span>
          </div>
          <div className="text-3xl font-bold text-[#1C1410]">{totalScans || 0}</div>
          <div className="text-sm text-[#A09588] mt-1">Across all menus</div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-sm font-medium text-[#6B635A]">Current Plan</span>
          </div>
          <div className="text-3xl font-bold text-[#1C1410] capitalize">{plan}</div>
          <div className="text-sm text-[#A09588] mt-1">Renews {renewalDate}</div>
        </div>

        <div className="bg-gradient-to-br from-primary to-[#E05A4A] rounded-2xl p-6 shadow-sm text-white sm:col-span-2 lg:col-span-1">
          <div className="text-sm font-medium mb-4 opacity-80">Quick Action</div>
          <div className="text-lg font-bold mb-4">Create a New Menu</div>
          <Link
            href="/dashboard/menus/new"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold rounded-xl px-4 py-2 text-sm hover:bg-[#FAF7F2] transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create Menu
          </Link>
        </div>
      </div>

      {/* Recent Menus */}
      {menus && menus.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display text-[#1C1410]">Your Menus</h2>
            <Link href="/dashboard/menus" className="text-primary text-sm font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {menus.slice(0, 3).map((menu: { id: string; is_active: boolean; restaurants: any }) => (
              <div key={menu.id} className="bg-white rounded-2xl border border-[#EDE8E0] p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5F1EB] rounded-xl flex items-center justify-center">
                    <UtensilsCrossed className="w-5 h-5 text-[#6B635A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1C1410]">{menu.restaurants?.name}</div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${menu.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {menu.is_active ? 'Active' : 'Draft'}
                    </span>
                  </div>
                </div>
                <Link href={`/dashboard/menus/${menu.id}`} className="text-[#6B635A] hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {(!menus || menus.length === 0) && (
        <div className="bg-white rounded-3xl border border-[#EDE8E0] p-8 sm:p-16 text-center shadow-sm">
          <div className="max-w-xs mx-auto mb-8">
            <Image 
              src="/Instruction_manual-rafiki.svg" 
              alt="No menus illustration" 
              width={300} 
              height={300}
              className="w-full h-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#1C1410] mb-2">Ready to serve?</h3>
          <p className="text-[#6B635A] mb-8 text-base max-w-sm mx-auto">Create your first digital menu and start receiving scans instantly. It only takes a few minutes.</p>
          <Link
            href="/dashboard/menus/new"
            className="inline-flex items-center gap-2 bg-[#1C1410] text-white font-bold rounded-full px-8 py-4 hover:bg-[#F57363] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            Create Your First Menu
          </Link>
        </div>
      )}
    </div>
  )
}
