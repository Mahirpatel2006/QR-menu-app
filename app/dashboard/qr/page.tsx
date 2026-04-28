import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { QrCode, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default async function QRCodesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: menus } = await supabase
    .from('menus')
    .select(`
      id, slug, is_active,
      restaurants ( name )
    `)
    .eq('owner_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="mb-8 bg-white p-8 rounded-[2rem] border border-[#EDE8E0] shadow-sm flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[#1C1410] font-display">QR Codes</h1>
          <p className="text-[#6B635A] mt-2 max-w-sm">Manage and download QR codes for your menus. Place them on tables to let customers scan and order instantly.</p>
        </div>
        <div className="w-48 h-48 relative opacity-20 pointer-events-none absolute right-0 top-0">
          <Image src="/QR_Code-amico.svg" alt="QR Decoration" fill className="object-contain" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus?.map((menu: any) => (
          <div 
            key={menu.id} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                <QrCode className="w-6 h-6" />
              </div>
              <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                menu.is_active ? 'bg-accent-green/10 text-accent-green' : 'bg-text-muted/10 text-text-muted'
              }`}>
                {menu.is_active ? 'Active' : 'Inactive'}
              </div>
            </div>

            <h3 className="font-display text-lg font-bold text-text-primary mb-1">
              {menu.restaurants?.name || 'Unnamed Menu'}
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              slug: {menu.slug}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link 
                href={`/dashboard/menus/${menu.id}/qr`}
                className="flex items-center justify-center gap-2 bg-sidebar hover:bg-border text-text-primary py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                View QR
              </Link>
              <Link 
                href={`/menu/${menu.slug}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-primary-light hover:bg-[#F57363]/30 text-primary py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Live <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}

        {(!menus || menus.length === 0) && (
          <div className="col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#EDE8E0] shadow-sm">
            <div className="w-48 h-48 relative mb-6">
              <Image src="/QR_Code-amico.svg" alt="No menus illustration" fill className="object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-[#1C1410] mb-2">No QR codes yet</h3>
            <p className="text-[#6B635A] max-w-xs mb-8">
              Create your first menu to automatically generate a high-quality QR code.
            </p>
            <Link 
              href="/dashboard/menus/new" 
              className="bg-[#1C1410] text-white px-8 py-4 rounded-full font-bold hover:bg-[#F57363] transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Create Your First Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
