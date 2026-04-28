import Image from 'next/image'
import { MenuData } from './types'

export function MidnightTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-[#F0EDE8]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#F57363] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#1C1410] blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-16 px-4 flex flex-col items-center text-center">
          {restaurant.logo_url && (
            <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 bg-black/50 backdrop-blur-md p-1">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <Image src={restaurant.logo_url} alt={restaurant.name} width={112} height={112} className="object-cover w-full h-full" />
              </div>
            </div>
          )}
          <h1 className="text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {restaurant.name}
          </h1>
          <div className="flex flex-col items-center gap-3">
            <span className="bg-[#F57363]/20 text-[#F57363] px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-[#F57363]/30">
              {restaurant.business_type || 'Menu'}
            </span>
            {restaurant.address && <p className="text-gray-400 text-sm max-w-md">{restaurant.address}</p>}
          </div>
        </header>

        {/* Navigation */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 bg-[#121212]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
            <div className="max-w-3xl mx-auto flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold text-sm whitespace-nowrap hover:bg-[#F57363] hover:text-white hover:border-transparent transition-all shadow-sm"
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
              <h2 className="text-3xl font-extrabold mb-8 text-white flex items-center gap-4">
                {cat.name}
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {cat.menu_items.map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-row gap-4 hover:bg-white/10 transition-colors">
                    {item.image_url && (
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-xl overflow-hidden bg-black/50">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h3 className="font-bold text-lg sm:text-xl text-white leading-tight flex items-center gap-2">
                          {item.name}
                          <div className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${item.is_veg ? 'border-green-500/50' : 'border-red-500/50'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                        </h3>
                        <span className="font-black text-[#F57363] text-lg sm:text-xl shrink-0">₹{item.price}</span>
                      </div>
                      {item.description && <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-gray-500 border-t border-white/5 mt-10">
          Powered by <span className="text-[#F57363] font-bold">Click2Menu</span>
        </footer>
      </div>
    </div>
  )
}
