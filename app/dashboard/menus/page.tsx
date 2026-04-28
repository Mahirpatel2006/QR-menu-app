import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PlusCircle, Edit, QrCode, Eye, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'

export default async function MenusPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: menus }, { data: subscription }] = await Promise.all([
    supabase
      .from('menus')
      .select('id, slug, theme, is_active, created_at, restaurants(id, name, logo_url, business_type)')
      .eq('owner_id', user!.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('subscriptions')
      .select('menu_limit')
      .eq('owner_id', user!.id)
      .eq('status', 'active')
      .maybeSingle(),
  ])

  const menuLimit = subscription?.menu_limit ?? 1
  const atLimit = (menus?.length ?? 0) >= menuLimit

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2rem] border border-[#EDE8E0] shadow-sm overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.08] pointer-events-none hidden lg:block">
           <Image src="/menu.svg" alt="Menus decoration" fill className="object-cover" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 sm:p-10 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1C1410] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FDDDD8] rounded-xl flex items-center justify-center text-primary lg:hidden">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              Your Menus
            </h1>
            <p className="text-[#6B635A] mt-3 text-base sm:text-lg leading-relaxed">
              Manage your digital menus, customize themes, and track scan performance from one central hub.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs font-bold bg-[#FAF7F2] border border-[#EDE8E0] text-[#1C1410] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                {menus?.length ?? 0} / {menuLimit} Active Menus
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <div className="hidden sm:block w-32 h-32 relative opacity-20">
              <Image src="/menu.svg" alt="Menu Icon" fill className="object-contain" />
            </div>
            {atLimit ? (
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white font-bold rounded-2xl px-8 py-4 hover:bg-amber-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Upgrade Plan
              </Link>
            ) : (
              <Link
                href="/dashboard/menus/new"
                className="inline-flex items-center justify-center gap-2 bg-[#F57363] text-white font-bold rounded-2xl px-8 py-4 hover:bg-[#E05A4A] transition-all shadow-[0_8px_20px_rgba(245,115,99,0.3)] hover:shadow-[0_12px_30px_rgba(245,115,99,0.4)] transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <PlusCircle className="w-5 h-5" />
                Create Menu
              </Link>
            )}
          </div>
        </div>
      </div>

      {menus && menus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {menus.map((menu: { id: string; created_at: string; is_active: boolean; slug: string; restaurants: any }) => (
            <div key={menu.id} className="bg-white rounded-2xl border border-[#EDE8E0] shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              {/* Card header */}
              <div className="bg-gradient-to-br from-[#F5F1EB] to-[#EDE8E0] h-24 flex items-center justify-center">
                <UtensilsCrossed className="w-10 h-10 text-[#A09588]" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#1C1410] text-lg leading-tight">{menu.restaurants?.name}</h3>
                    <p className="text-xs text-[#A09588] capitalize mt-0.5">{menu.restaurants?.business_type ?? 'Restaurant'}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${menu.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {menu.is_active ? '● Active' : '○ Draft'}
                  </span>
                </div>

                <p className="text-xs text-[#A09588] mb-4">
                  Created {new Date(menu.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/menus/${menu.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#F5F1EB] text-[#1C1410] rounded-xl py-2 text-sm font-medium hover:bg-[#EDE8E0] transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <Link
                    href={`/dashboard/menus/${menu.id}/qr`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#F5F1EB] text-[#1C1410] rounded-xl py-2 text-sm font-medium hover:bg-[#EDE8E0] transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR Code
                  </Link>
                  <Link
                    href={`/menu/${menu.slug}`}
                    target="_blank"
                    className="flex items-center justify-center w-9 h-9 bg-[#F5F1EB] text-[#6B635A] rounded-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#EDE8E0] p-12 sm:p-20 text-center shadow-sm">
          <div className="max-w-xs mx-auto mb-8">
            <Image 
              src="/Order_food-rafiki.svg" 
              alt="No menus illustration" 
              width={300} 
              height={300}
              className="w-full h-auto"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#1C1410] mb-2">No menus yet</h3>
          <p className="text-[#6B635A] mb-8 max-w-xs mx-auto">Create your first digital menu and generate a QR code to share with customers.</p>
          <Link
            href="/dashboard/menus/new"
            className="inline-flex items-center gap-2 bg-[#1C1410] text-white font-bold rounded-full px-8 py-4 hover:bg-[#F57363] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" /> Create Your First Menu
          </Link>
        </div>
      )}
    </div>
  )
}
