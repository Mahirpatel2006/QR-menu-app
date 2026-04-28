'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface ChartData {
  date: string
  scans: number
}

export function AnalyticsChart({ data }: { data: ChartData[] }) {
  // Format date for display: "2024-03-20" -> "20 Mar"
  const formatData = data.map(item => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
        <XAxis 
          dataKey="displayDate" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6B635A', fontSize: 12 }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#6B635A', fontSize: 12 }}
        />
        <Tooltip 
          cursor={{ fill: '#F57363', opacity: 0.05 }}
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            padding: '12px'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '4px', color: '#1C1410' }}
        />
        <Bar 
          dataKey="scans" 
          radius={[6, 6, 0, 0]}
          barSize={40}
        >
          {formatData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.scans > 0 ? '#F57363' : '#EDE8E0'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
