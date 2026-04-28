"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  QrCode, 
  BarChart2, 
  Settings 
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Menus', href: '/dashboard/menus', icon: UtensilsCrossed },
  { name: 'QR Codes', href: '/dashboard/qr', icon: QrCode },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
]

export { navItems }

export function Sidebar({ planName = 'No Plan' }: { planName?: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] bg-[#F5F1EB] h-screen fixed left-0 border-r border-[#EDE8E0] hidden lg:flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="font-display text-2xl font-bold text-primary">
          Click2Menu
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-[#6B635A] hover:bg-white/60 hover:text-[#1C1410]'
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 m-4 bg-white rounded-xl border border-[#EDE8E0] shadow-sm">
        <div className="text-xs font-semibold text-[#A09588] uppercase tracking-wider mb-2">
          Current Plan
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-[#1C1410] capitalize">{planName}</span>
          <Link href="/dashboard/billing" className="text-xs text-primary font-semibold hover:underline">
            {planName === 'No Plan' ? 'Select Plan' : 'Upgrade'}
          </Link>
        </div>
      </div>
    </aside>
  )
}
