import Image from 'next/image'
import { MenuData } from './types'

export function RoyalTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#2D1B4E] font-serif text-[#F3E8FF] selection:bg-[#D4AF37] selection:text-white">
      {/* Ornate Background Pattern (CSS pseudo-element approximation) */}
      <div className="fixed inset-0 z-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-20 pb-16 px-4 flex flex-col items-center text-center border-b border-[#D4AF37]/20 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70"></div>
          
          {restaurant.logo_url && (
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-8 bg-[#1A0B2E]">
              <Image src={restaurant.logo_url} alt={restaurant.name} width={112} height={112} className="object-cover w-full h-full" />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-[#D4AF37] mb-4 drop-shadow-lg">
            {restaurant.name}
          </h1>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-[#D4AF37]/60">
              <span className="w-12 h-[1px] bg-[#D4AF37]/60"></span>
              <span className="uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                {restaurant.business_type || 'Menu'}
              </span>
              <span className="w-12 h-[1px] bg-[#D4AF37]/60"></span>
            </div>
            {restaurant.address && <p className="text-[#E9D5FF] text-sm md:text-base max-w-md italic">{restaurant.address}</p>}
          </div>
        </header>

        {/* Navigation */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 bg-[#2D1B4E]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl">
            <div className="max-w-4xl mx-auto flex gap-6 overflow-x-auto px-4 py-5 no-scrollbar justify-start md:justify-center">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="text-[#E9D5FF] uppercase tracking-widest text-xs font-sans font-semibold whitespace-nowrap hover:text-[#D4AF37] transition-colors relative group"
                >
                  {cat.name}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-[#D4AF37] transition-all group-hover:w-full group-hover:left-0"></span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="max-w-4xl mx-auto px-4 py-16 space-y-20">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-4xl text-[#D4AF37] mb-4">{cat.name}</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rotate-45 bg-[#D4AF37]/50"></div>
                  <div className="w-16 h-[1px] bg-[#D4AF37]/50"></div>
                  <div className="w-2 h-2 rotate-45 bg-[#D4AF37]/50"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {cat.menu_items.map((item) => (
                  <div key={item.id} className="group">
                    {item.image_url && (
                      <div className="relative h-56 w-full mb-5 rounded-sm overflow-hidden border border-[#D4AF37]/20 bg-[#1A0B2E]">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                        <div className="absolute inset-0 border border-[#D4AF37]/40 m-2 pointer-events-none"></div>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline gap-4 mb-2">
                      <h3 className="font-bold text-xl text-[#F3E8FF] flex items-center gap-3">
                        {item.name}
                        <div className={`shrink-0 w-3 h-3 rotate-45 border flex items-center justify-center ${item.is_veg ? 'border-green-500/50' : 'border-red-500/50'}`}>
                          <div className={`w-1.5 h-1.5 rotate-45 ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>
                      </h3>
                      <div className="flex-1 border-b border-dashed border-[#D4AF37]/30 mx-2 relative top-[-6px]"></div>
                      <span className="font-semibold text-[#D4AF37] text-xl shrink-0">₹{item.price}</span>
                    </div>
                    {item.description && <p className="text-[#C084FC] text-sm leading-relaxed italic pr-12">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-[#D4AF37]/20 mt-12 bg-[#1A0B2E]/50">
          <p className="text-[#C084FC] text-xs font-sans tracking-widest uppercase">
            Powered by <span className="text-[#D4AF37] font-bold">Click2Menu</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
