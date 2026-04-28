import Image from 'next/image'
import { MenuData } from './types'

export function SpiceTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans text-[#451A03] overflow-x-hidden">
      {/* Playful Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="spice-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="#EA580C" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#spice-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-16 pb-12 px-4 relative flex flex-col items-center text-center">
          <div className="absolute top-10 right-10 w-20 h-20 bg-[#F59E0B] rounded-full mix-blend-multiply blur-xl opacity-50"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#EF4444] rounded-full mix-blend-multiply blur-xl opacity-30"></div>
          
          {restaurant.logo_url && (
            <div className="w-32 h-32 overflow-hidden mb-6 bg-white shadow-[8px_8px_0px_#EA580C] border-4 border-[#451A03] rounded-2xl rotate-3">
              <Image src={restaurant.logo_url} alt={restaurant.name} width={128} height={128} className="object-cover w-full h-full -rotate-3 scale-110" />
            </div>
          )}
          <h1 className="text-6xl font-black uppercase tracking-tighter text-[#EA580C] drop-shadow-[4px_4px_0px_#451A03] mb-4">
            {restaurant.name}
          </h1>
          <div className="flex flex-col items-center gap-3">
            <span className="bg-[#451A03] text-[#FEF3C7] px-6 py-2 rounded-none border-b-4 border-r-4 border-[#EA580C] text-sm font-bold tracking-widest uppercase">
              {restaurant.business_type || 'Menu'}
            </span>
            {restaurant.address && <p className="text-[#92400E] font-bold text-lg max-w-md mt-2 bg-[#FEF3C7] px-4 py-1 border-2 border-[#D97706] rotate-[-1deg]">{restaurant.address}</p>}
          </div>
        </header>

        {/* Navigation */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 bg-[#F59E0B] border-y-4 border-[#451A03] shadow-[0_8px_0px_rgba(69,26,3,0.1)]">
            <div className="max-w-4xl mx-auto flex gap-4 overflow-x-auto px-4 py-4 no-scrollbar justify-start md:justify-center">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-6 py-2 bg-[#FFFBEB] border-2 border-[#451A03] text-[#EA580C] font-black uppercase text-sm whitespace-nowrap hover:bg-[#EA580C] hover:text-[#FFFBEB] hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_#451A03]"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="max-w-4xl mx-auto px-4 py-16 space-y-24">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black uppercase text-[#FFFBEB] bg-[#EA580C] px-6 py-2 border-4 border-[#451A03] shadow-[6px_6px_0px_#451A03] rotate-[-2deg]">
                  {cat.name}
                </h2>
                <div className="h-1 flex-1 bg-[#451A03] rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cat.menu_items.map((item) => (
                  <div key={item.id} className="bg-white border-4 border-[#451A03] shadow-[8px_8px_0px_#D97706] p-5 flex flex-col hover:-translate-y-2 hover:shadow-[12px_12px_0px_#EA580C] transition-all">
                    {item.image_url && (
                      <div className="relative h-48 w-full mb-4 border-2 border-[#451A03] bg-[#FEF3C7] overflow-hidden">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-black text-2xl text-[#451A03] leading-none uppercase">
                          {item.name}
                        </h3>
                        <span className="font-black text-2xl text-[#EA580C] bg-[#FEF3C7] px-2 py-1 border-2 border-[#451A03] shrink-0 rotate-3">
                          ₹{item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <div className={`text-xs font-bold uppercase px-2 py-0.5 border-2 ${item.is_veg ? 'bg-green-100 text-green-800 border-green-800' : 'bg-red-100 text-red-800 border-red-800'}`}>
                          {item.is_veg ? 'Veg' : 'Non-Veg'}
                        </div>
                      </div>
                      {item.description && <p className="text-[#92400E] font-medium text-base">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="text-center py-10 border-t-8 border-[#F59E0B] bg-[#451A03] mt-16 text-[#FEF3C7]">
          <p className="font-black uppercase text-xl">
            Powered by <span className="text-[#EA580C]">Click2Menu</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
