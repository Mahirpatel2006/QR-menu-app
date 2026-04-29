'use client'

import Image from 'next/image'
import { MenuData } from './types'

export function FreshTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen text-[#1B3B2B] overflow-x-hidden"
      style={{ backgroundColor: '#F0F7EC', fontFamily: '"Segoe UI", system-ui, sans-serif' }}>

      {/* Organic leaf/blob background shapes */}
      <div className="fixed top-0 right-0 w-80 h-80 opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, #A7F3D0, transparent 70%)', borderRadius: '0 0 0 80%' }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 opacity-15 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, #6EE7B7, transparent 70%)', borderRadius: '0 80% 0 0' }} />

      <div className="relative z-10">
        {/* Header — Organic Market Board style */}
        <header className="pt-14 pb-10 px-6 text-center relative">
          {/* Organic wavy top border */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
              <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,15 1440,20 L1440,0 L0,0 Z" fill="#34D399" fillOpacity="0.3" />
            </svg>
          </div>

          {restaurant.logo_url ? (
            <div className="relative w-28 h-28 mx-auto mb-6">
              {/* Leaf-shaped frame using clip-path */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src={restaurant.logo_url} alt={restaurant.name} fill className="object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center text-white text-lg">
                🌿
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto mb-6 bg-[#10B981] rounded-full flex items-center justify-center text-white text-5xl shadow-xl border-4 border-white">
              🌿
            </div>
          )}

          <h1 className="text-5xl md:text-6xl font-black text-[#064E3B] tracking-tight mb-2">{restaurant.name}</h1>

          <div className="inline-flex items-center gap-2 bg-[#10B981] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md mt-2">
            <span className="text-base">🌱</span>
            <span>{restaurant.business_type || 'Fresh Menu'}</span>
          </div>
          {restaurant.address && (
            <p className="text-[#047857] text-sm font-semibold mt-3 flex items-center justify-center gap-1">
              <span>📍</span> {restaurant.address}
            </p>
          )}
        </header>

        {/* Navigation — Leaf tabs */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 backdrop-blur-md border-y border-[#A7F3D0]"
            style={{ backgroundColor: 'rgba(240, 247, 236, 0.92)' }}>
            <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#A7F3D0] text-[#047857] font-bold text-sm whitespace-nowrap hover:bg-[#10B981] hover:text-white hover:border-[#10B981] transition-all shadow-sm"
                >
                  🌿 {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="max-w-3xl mx-auto px-4 py-12 space-y-16">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
              {/* Category header — wooden sign style */}
              <div className="relative mb-10 flex justify-center">
                <div className="relative px-10 py-3 bg-[#064E3B] text-[#A7F3D0] font-black text-2xl rounded-2xl shadow-lg"
                  style={{ boxShadow: '0 6px 0 #022c1f' }}>
                  {cat.name}
                </div>
                {/* Hanging strings */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-20">
                  <div className="w-0.5 h-4 bg-[#A7F3D0]/50" />
                  <div className="w-0.5 h-4 bg-[#A7F3D0]/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cat.menu_items.map((item, idx) => (
                  <div key={item.id}
                    className={`bg-white rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-sm border border-[#D1FAE5] hover:shadow-md hover:border-[#6EE7B7] transition-all duration-300 ${idx % 3 === 0 ? 'sm:flex-row' : idx % 3 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                    {item.image_url && (
                      <div className="relative w-full sm:w-44 h-44 shrink-0 overflow-hidden">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#064E3B]/10" />
                      </div>
                    )}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <h3 className="font-black text-xl text-[#064E3B] leading-tight">{item.name}</h3>
                          <span className="font-black text-xl text-[#10B981] bg-[#F0FDF4] px-3 py-1 rounded-xl shrink-0">
                            ₹{item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-[#047857] leading-relaxed font-medium">{item.description}</p>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${item.is_veg ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                          {item.is_veg ? '🌱 Pure Veg' : '🍖 Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Wavy footer */}
        <div className="relative mt-8">
          <svg viewBox="0 0 1440 40" className="w-full" preserveAspectRatio="none">
            <path d="M0,20 C360,0 720,40 1080,20 C1260,10 1380,25 1440,20 L1440,40 L0,40 Z" fill="#064E3B" />
          </svg>
          <footer className="bg-[#064E3B] text-center py-8">
            <p className="text-[#A7F3D0] text-xs font-bold tracking-[0.3em] uppercase">
              🌿 Powered by <span className="text-[#34D399] font-black">Click2Menu</span> 🌿
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
