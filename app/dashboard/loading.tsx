import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 w-64 bg-[#EDE8E0]/60 rounded-xl mb-3"></div>
        <div className="h-5 w-96 bg-[#EDE8E0]/60 rounded-xl"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm h-36 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EDE8E0]/50 rounded-xl"></div>
              <div className="h-4 w-24 bg-[#EDE8E0]/50 rounded-lg"></div>
            </div>
            <div>
              <div className="h-8 w-16 bg-[#EDE8E0]/60 rounded-xl mb-2"></div>
              <div className="h-3 w-32 bg-[#EDE8E0]/50 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 w-32 bg-[#EDE8E0]/60 rounded-xl"></div>
          <div className="h-4 w-16 bg-[#EDE8E0]/60 rounded-lg"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#EDE8E0] h-20 p-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-[#EDE8E0]/50 rounded-xl"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 w-48 bg-[#EDE8E0]/60 rounded-lg"></div>
                <div className="h-3 w-24 bg-[#EDE8E0]/50 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Central Spinner for extra assurance */}
      <div className="flex justify-center pt-8">
        <Loader2 className="w-6 h-6 text-[#A09588] animate-spin opacity-50" />
      </div>
    </div>
  )
}
