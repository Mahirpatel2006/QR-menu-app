import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Navbar } from '@/components/dashboard/Navbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('owner_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  const planName = subscription?.plan || 'No Plan'

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Sidebar planName={planName} />
      <div className="lg:pl-[240px] flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
