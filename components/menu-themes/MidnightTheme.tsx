'use client'

import Image from 'next/image'
import { MenuData } from './types'

export function MidnightTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#111111', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F0EAE0' }}>

      {/* Subtle warm radial glow — like a single candle in a dark room */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,115,99,0.06) 0%, transparent 70%)' }} />

      {/* Fine grain texture via SVG noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '256px' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4">

        {/* Header */}
        <header className="pt-14 pb-10 text-center">
         

          <div className="inline-block text-xs font-bold tracking-[0.35em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(245,115,99,0.1)', color: '#F57363', border: '1px solid rgba(245,115,99,0.2)' }}>
            {restaurant.business_type || 'Menu'}
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3" style={{ color: '#F0EAE0', fontFamily: '"Playfair Display SC", serif' }}>
            {restaurant.name}
          </h1>

          {restaurant.address && (
            <p className="text-sm font-medium flex items-center justify-center gap-1.5" style={{ color: 'rgba(240,234,224,0.35)' }}>
              <span className="w-1 h-1 bg-[#F57363] rounded-full inline-block opacity-60" />
              {restaurant.address}
            </p>
          )}
        </header>

        {/* Category Navigation */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 backdrop-blur-xl pt-3 pb-3"
            style={{ backgroundColor: 'rgba(17,17,17,0.88)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-4 py-2 font-semibold text-sm whitespace-nowrap rounded-full transition-all shrink-0"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(240,234,224,0.6)'
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.backgroundColor = 'rgba(245,115,99,0.15)'
                    el.style.borderColor = 'rgba(245,115,99,0.4)'
                    el.style.color = '#F57363'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.backgroundColor = 'rgba(255,255,255,0.05)'
                    el.style.borderColor = 'rgba(255,255,255,0.08)'
                    el.style.color = 'rgba(240,234,224,0.6)'
                  }}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="py-10 space-y-14">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">

              {/* Category heading */}
              <div className="flex items-center gap-4 mb-7">
                <h2 className="text-2xl font-black tracking-tight shrink-0"
                  style={{ color: '#F0EAE0', fontFamily: '"Playfair Display SC", serif' }}>
                  {cat.name}
                </h2>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(245,115,99,0.3), transparent)' }} />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {cat.menu_items.map((item) => (
                  <div key={item.id}
                    className="group flex gap-4 p-4 rounded-2xl transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'rgba(255,255,255,0.05)'
                      el.style.borderColor = 'rgba(245,115,99,0.2)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'rgba(255,255,255,0.03)'
                      el.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                  >
                    {item.image_url && (
                      <div className="relative w-22 h-22 w-[88px] h-[88px] shrink-0 rounded-xl overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        {/* Dark vignette on image */}
                        <div className="absolute inset-0"
                          style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-3 mb-1.5">
                          <h3 className="font-bold text-lg leading-snug" style={{ color: '#F0EAE0' }}>{item.name}</h3>
                          <span className="font-black text-base shrink-0 px-3 py-0.5 rounded-full"
                            style={{ color: '#F57363', backgroundColor: 'rgba(245,115,99,0.1)', border: '1px solid rgba(245,115,99,0.2)' }}>
                            ₹{item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'rgba(240,234,224,0.4)' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full`}
                          style={item.is_veg
                            ? { backgroundColor: 'rgba(34,197,94,0.1)', color: 'rgba(134,239,172,0.8)', border: '1px solid rgba(34,197,94,0.2)' }
                            : { backgroundColor: 'rgba(239,68,68,0.1)', color: 'rgba(252,165,165,0.8)', border: '1px solid rgba(239,68,68,0.2)' }
                          }>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${item.is_veg ? 'bg-green-400' : 'bg-red-400'}`} />
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

        <footer className="text-center py-8 mb-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-medium" style={{ color: 'rgba(240,234,224,0.25)' }}>
            Powered by <span style={{ color: '#F57363', fontWeight: 700 }}>Click2Menu</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
