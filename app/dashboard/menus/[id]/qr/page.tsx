import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QRCodeClient } from './QRCodeClient'
import Image from 'next/image'

export default async function QRPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: menu } = await supabase
    .from('menus')
    .select('id, slug, is_active, restaurants(name)')
    .eq('id', params.id)
    .eq('owner_id', user!.id)
    .single()

  if (!menu) notFound()

  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/menu/${menu.slug}`

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <Link href="/dashboard/menus" className="text-sm text-[#6B635A] hover:text-primary mb-2 inline-block">
          ← Back to menus
        </Link>
        <h1 className="text-3xl font-bold font-display text-[#1C1410]">QR Code</h1>
        <p className="text-[#6B635A] mt-1">{(menu.restaurants as any)?.name}</p>
      </div>

      <QRCodeClient menuUrl={menuUrl} menuSlug={menu.slug} />

      <div className="pt-12 flex flex-col items-center">
        <div className="w-64 h-64 relative opacity-80">
          <Image 
            src="/QR_Code-amico.svg" 
            alt="QR Code illustration" 
            fill
            className="object-contain"
          />
        </div>
        <p className="text-[#6B635A] text-sm mt-4 text-center max-w-xs">
          Download your high-quality QR code and place it on your tables for instant menu access.
        </p>
      </div>
    </div>
  )
}
