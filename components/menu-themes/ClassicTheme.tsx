import Image from 'next/image'
import { MenuData } from './types'

export function ClassicTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1410]"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>

      {/* Soft ambient glow top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FDDDD8] rounded-full blur-[120px] opacity-50 pointer-events-none z-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4">

        {/* Header */}
        <header className="pt-14 pb-10 text-center">
       

          <div className="inline-block bg-[#FDDDD8] text-[#F57363] text-xs font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4">
            {restaurant.business_type || 'Menu'}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1C1410] leading-tight tracking-tight mb-3"
            style={{ fontFamily: '"Playfair Display SC", serif' }}>
            {restaurant.name}
          </h1>

          {restaurant.address && (
            <p className="text-sm text-[#6B635A] font-medium flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#F57363] rounded-full inline-block" />
              {restaurant.address}
            </p>
          )}
        </header>

        {/* Category Navigation */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 bg-[#FAF7F2]/90 backdrop-blur-md pt-3 pb-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-4 py-2 bg-white border border-[#EDE8E0] text-[#6B635A] font-semibold text-sm whitespace-nowrap rounded-full hover:bg-[#F57363] hover:text-white hover:border-[#F57363] transition-all shadow-sm shrink-0"
                >
                  {cat.name}
                </a>
              ))}
            </div>
            <div className="mt-3 h-px bg-[#EDE8E0]" />
          </div>
        )}

        {/* Menu Content */}
        <main className="py-10 space-y-14">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">

              {/* Category heading */}
              <div className="flex items-center gap-4 mb-7">
                <h2 className="text-2xl font-black text-[#1C1410] tracking-tight shrink-0"
                  style={{ fontFamily: '"Playfair Display SC", serif' }}>
                  {cat.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#EDE8E0] to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cat.menu_items.map((item) => (
                  <div key={item.id}
                    className="group bg-white border border-[#EDE8E0] rounded-[2rem] p-4 flex gap-4 hover:border-[#F57363]/30 hover:shadow-[0_8px_30px_rgba(245,115,99,0.08)] transition-all duration-300">

                    {item.image_url && (
                      <div className="relative w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden border border-[#EDE8E0] bg-[#FAF7F2]">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-3 mb-1.5">
                          <h3 className="font-bold text-lg text-[#1C1410] leading-snug">{item.name}</h3>
                          <span className="font-black text-lg text-[#F57363] shrink-0 bg-[#FDDDD8] px-3 py-0.5 rounded-full">
                            ₹{item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-[#6B635A] leading-relaxed line-clamp-2">{item.description}</p>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${item.is_veg
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 text-red-700 border-red-200'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                          {item.is_veg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="text-center py-8 border-t border-[#EDE8E0] mb-6">
          <p className="text-xs text-[#A09588] font-medium">
            Powered by <span className="text-[#F57363] font-bold">Click2Menu</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
