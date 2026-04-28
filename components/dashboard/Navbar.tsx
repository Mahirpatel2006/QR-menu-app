"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { navItems } from './Sidebar'

export function Navbar({ user }: { user: User | null }) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <header className="px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20 pointer-events-none">
        <div className="flex items-center gap-4 lg:hidden pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-md border border-[#EDE8E0] h-[52px] rounded-2xl shadow-sm flex items-center gap-3 px-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#1C1410] hover:bg-[#F5F1EB] rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/dashboard" className="text-lg font-bold font-display text-primary pr-2">
              Click2Menu
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex flex-1" /> 

        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-3 sm:px-4 py-2 h-[52px] rounded-2xl">
            <div className="flex items-center gap-3 pr-3 sm:pr-4 border-r border-[#EDE8E0] max-w-[120px] sm:max-w-none">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_12px_rgba(245,115,99,0.3)] shrink-0">
                {user?.user_metadata?.full_name?.charAt(0) || <UserIcon className="w-4 h-4" />}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-[#1C1410] leading-none truncate">
                  {user?.user_metadata?.full_name || 'Owner'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#6B635A] font-bold uppercase tracking-widest mt-1 opacity-70 hidden xs:block sm:block truncate">
                  Admin
                </span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-2 text-[#6B635A] hover:text-[#F57363] hover:bg-[#FDDDD8]/50 rounded-xl transition-all group shrink-0"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative w-64 max-w-[80%] bg-[#F5F1EB] h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between">
              <Link href="/dashboard" className="font-display text-2xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Click2Menu
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[#1C1410] hover:bg-white/60 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
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
            <div className="p-4 mt-auto">
              <Link
                href="/dashboard/billing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Billing & Plans
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
