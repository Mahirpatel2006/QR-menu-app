import { BarChart2, TrendingUp, Users, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'
import Image from 'next/image'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  
  // Fetch views with menu slug and restaurant name
  const { data: views } = await supabase
    .from('menu_views')
    .select(`
      user_agent, 
      menu_id, 
      created_at, 
      menus (
        slug,
        restaurants ( name )
      )
    `)
    .order('created_at', { ascending: false })

  // 1. Total Scans
  const totalScans = views?.length || 0

  // 2. Unique User Agents (proxy for unique visitors)
  const uniqueVisitors = new Set(views?.map(v => v.user_agent)).size

  // 3. Top Menu (by Restaurant Name)
  const menuCounts: Record<string, { count: number, slug: string }> = {}
  views?.forEach(v => {
    const restaurantName = (v.menus as any)?.restaurants?.name || 'Unknown Restaurant'
    const slug = (v.menus as any)?.slug || 'Unknown'
    if (!menuCounts[restaurantName]) {
      menuCounts[restaurantName] = { count: 0, slug }
    }
    menuCounts[restaurantName].count += 1
  })
  
  const topMenuEntry = Object.entries(menuCounts).sort((a, b) => b[1].count - a[1].count)[0]
  const topMenu = topMenuEntry ? topMenuEntry[0] : 'N/A'

  // 4. Data for chart (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  }).reverse()

  const chartData = last7Days.map(date => ({
    date,
    scans: views?.filter(v => v.created_at.startsWith(date)).length || 0
  }))

  const stats = [
    { label: 'Total Scans', value: totalScans.toLocaleString(), icon: Eye, color: 'text-[#F57363]', bg: 'bg-[#FDDDD8]' },
    { label: 'Unique Visitors', value: uniqueVisitors.toLocaleString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Top Menu', value: topMenu, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  ]

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-8 rounded-3xl border border-[#EDE8E0] shadow-sm">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#1C1410] mb-2">Analytics</h1>
          <p className="text-[#6B635A] text-lg">Track your menu performance and visitor engagement in real-time.</p>
        </div>
        <div className="w-48 h-48 relative">
          <Image 
            src="/analytics02.svg" 
            alt="Analytics illustration" 
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE8E0]">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#6B635A] font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-[#1C1410]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#EDE8E0] shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[#1C1410] mb-6">Scans in Last 7 Days</h2>
        <div className="h-[300px] w-full">
          <AnalyticsChart data={chartData} />
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#EDE8E0] shadow-sm">
        <h2 className="text-xl font-bold text-[#1C1410] mb-6">Performance by Restaurant</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6B635A] text-sm border-b border-[#EDE8E0]">
                <th className="pb-4 font-medium">Restaurant / Menu</th>
                <th className="pb-4 font-medium text-center">Total Scans</th>
                <th className="pb-4 font-medium text-right">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E0]">
              {Object.entries(menuCounts).map(([name, data]) => (
                <tr key={name} className="text-[#1C1410] hover:bg-[#FAF7F2] transition-colors group">
                  <td className="py-5">
                    <div className="font-bold text-lg group-hover:text-primary transition-colors">{name}</div>
                    <div className="text-xs text-[#6B635A] font-medium opacity-60">slug: {data.slug}</div>
                  </td>
                  <td className="py-5 text-center">
                    <span className="inline-flex items-center justify-center bg-[#FDDDD8] text-primary font-bold px-4 py-1 rounded-full text-sm">
                      {data.count}
                    </span>
                  </td>
                  <td className="py-5 text-right text-[#6B635A] text-sm font-medium">
                    {new Date(views?.filter(v => (v.menus as any)?.restaurants?.name === name)[0]?.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
              {Object.keys(menuCounts).length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-[#6B635A] opacity-20" />
                      </div>
                      <p className="text-[#6B635A] font-medium">No scan data available yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
