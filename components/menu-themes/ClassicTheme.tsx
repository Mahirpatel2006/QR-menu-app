import Image from 'next/image'
import { MenuData } from './types'

export function ClassicTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#1C1410]">
      {/* Header */}
      <header className="bg-[#F57363] text-white py-12 px-4 rounded-b-[40px] shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
          {restaurant.logo_url && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-white">
              <Image src={restaurant.logo_url} alt={restaurant.name} width={96} height={96} className="object-cover w-full h-full" />
            </div>
          )}
          <h1 className="text-4xl font-bold font-serif mb-2">{restaurant.name}</h1>
          <div className="flex flex-col items-center gap-2">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium tracking-wide uppercase">
              {restaurant.business_type || 'Menu'}
            </span>
            {restaurant.address && <p className="text-white/90 text-sm max-w-md">{restaurant.address}</p>}
          </div>
        </div>
      </header>

      {/* Navigation */}
      {categories.length > 1 && (
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE8E0] shadow-sm">
          <div className="max-w-3xl mx-auto flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="px-5 py-2 rounded-full bg-white border border-[#EDE8E0] text-[#6B635A] font-semibold text-sm whitespace-nowrap hover:border-[#F57363] hover:text-[#F57363] transition-colors shadow-sm"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Menu Content */}
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">
        {categories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-serif mb-6 pb-2 border-b-2 border-[#FDDDD8] text-[#1C1410] flex items-center gap-3">
              {cat.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.menu_items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#EDE8E0] flex flex-col hover:shadow-md transition-shadow">
                  {item.image_url && (
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h3 className="font-bold text-lg leading-tight flex items-start gap-2">
                        {item.name}
                        <div className={`shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center mt-0.5 ${item.is_veg ? 'border-green-500' : 'border-red-500'}`}>
                          <div className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                        </div>
                      </h3>
                      <span className="font-bold text-[#F57363] whitespace-nowrap">₹{item.price}</span>
                    </div>
                    {item.description && <p className="text-sm text-[#6B635A] leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-[#6B635A] border-t border-[#EDE8E0] mt-10">
        Powered by <span className="text-[#F57363] font-bold">Click2Menu</span>
      </footer>
    </div>
  )
}
