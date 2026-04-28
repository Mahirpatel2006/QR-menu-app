import Image from 'next/image'
import { MenuData } from './types'

export function FreshTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#F4F9F5] font-sans text-[#1B3B2B]">
      {/* Header */}
      <header className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#22C55E]/10 pattern-dots pattern-[#22C55E] pattern-bg-white pattern-size-4 pattern-opacity-20 z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#22C55E]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#A7F3D0]/40 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          {restaurant.logo_url && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-white shadow-xl mb-6 bg-white relative">
              <Image src={restaurant.logo_url} alt={restaurant.name} fill className="object-cover" />
            </div>
          )}
          <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-[#064E3B]">{restaurant.name}</h1>
          <div className="flex flex-col items-center gap-3">
            <span className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm">
              {restaurant.business_type || 'Menu'}
            </span>
            {restaurant.address && <p className="text-[#047857] font-medium max-w-md">{restaurant.address}</p>}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {categories.length > 1 && (
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#D1FAE5]">
          <div className="max-w-3xl mx-auto flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="px-5 py-2.5 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] text-[#047857] font-bold text-sm whitespace-nowrap hover:bg-[#10B981] hover:text-white hover:border-[#10B981] transition-all shadow-sm"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Menu Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#A7F3D0]"></div>
              <h2 className="text-3xl font-extrabold text-[#064E3B] px-4 text-center">
                {cat.name}
              </h2>
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#A7F3D0]"></div>
            </div>
            
            <div className="space-y-6">
              {cat.menu_items.map((item) => (
                <div key={item.id} className="bg-white rounded-[32px] p-3 shadow-sm border border-[#ECFDF5] flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-all duration-300">
                  {item.image_url && (
                    <div className="relative h-48 sm:h-36 w-full sm:w-40 shrink-0 rounded-[24px] overflow-hidden bg-[#F0FDF4]">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center py-2 pr-4 pl-2 sm:pl-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-bold text-xl text-[#064E3B] leading-tight flex items-center gap-2">
                        {item.name}
                        <div className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center ${item.is_veg ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>
                      </h3>
                      <span className="font-extrabold text-[#10B981] text-xl shrink-0 bg-[#F0FDF4] px-3 py-1 rounded-xl">₹{item.price}</span>
                    </div>
                    {item.description && <p className="text-[#047857] leading-relaxed font-medium">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-[#047857] font-medium bg-white border-t border-[#D1FAE5] mt-10">
        Powered by <span className="text-[#10B981] font-bold">Click2Menu</span>
      </footer>
    </div>
  )
}
