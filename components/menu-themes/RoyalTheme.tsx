'use client'

import Image from 'next/image'
import { MenuData } from './types'

export function RoyalTheme({ data }: { data: MenuData }) {
  const { restaurant, categories } = data

  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#0C0A0A', fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif', color: '#E8D5A3' }}>

      {/* Velvet texture via repeating gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(60,20,5,0.6) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(25,10,40,0.6) 0%, transparent 50%), linear-gradient(180deg, #0C0A0A 0%, #12080A 50%, #0A0A12 100%)'
        }} />

      {/* Subtle diamond pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 20px)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5">
        {/* Ornate gold top border */}
        <div className="w-full py-3 flex items-center justify-center gap-3">
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
          <span style={{ color: '#C9A84C', fontSize: '18px' }}>♦</span>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, #C9A84C, transparent)' }} />
        </div>

        {/* Grand Header */}
        <header className="py-12 text-center">
          {restaurant.logo_url ? (
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Octagonal golden frame */}
              <div className="absolute inset-0 rounded-full" style={{ border: '3px solid #C9A84C', boxShadow: '0 0 0 6px rgba(201,168,76,0.1), 0 0 30px rgba(201,168,76,0.2), inset 0 0 20px rgba(0,0,0,0.5)' }} />
              <div className="w-full h-full rounded-full overflow-hidden p-1">
                <Image src={restaurant.logo_url} alt={restaurant.name} fill className="object-cover rounded-full" style={{ filter: 'sepia(10%) contrast(1.1)' }} />
              </div>
            </div>
          ) : null}

          {/* Restaurant name with royal treatment */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
            <span style={{ color: '#C9A84C', fontSize: '12px' }}>✦</span>
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-none tracking-wide"
            style={{ color: '#C9A84C', textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.15)' }}>
            {restaurant.name}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
            <span style={{ color: '#C9A84C', fontSize: '12px' }}>✦</span>
            <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
          </div>

          <div className="text-xs tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(201,168,76,0.7)' }}>
            {restaurant.business_type || 'Fine Dining'}
          </div>
          {restaurant.address && (
            <p className="text-sm italic" style={{ color: 'rgba(232,213,163,0.5)' }}>{restaurant.address}</p>
          )}
        </header>

        {/* Navigation — Gilded text links */}
        {categories.length > 1 && (
          <div className="sticky top-0 z-20 backdrop-blur-xl"
            style={{ backgroundColor: 'rgba(12,10,10,0.92)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="flex gap-0 overflow-x-auto no-scrollbar py-4 px-2 justify-start">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="px-5 py-1.5 text-xs font-semibold tracking-[0.3em] uppercase whitespace-nowrap transition-all hover:opacity-100 group relative"
                  style={{ color: 'rgba(201,168,76,0.6)', fontFamily: 'Georgia, serif' }}
                >
                  <span className="group-hover:text-[#C9A84C] transition-colors">{cat.name}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C9A84C] group-hover:w-4/5 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="py-16 space-y-20">
          {categories.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
              {/* Ornate category header */}
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
                  <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '10px' }}>◆◆◆</span>
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
                </div>
                <h2 className="text-4xl font-bold tracking-wider" style={{ color: '#C9A84C' }}>{cat.name}</h2>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
                  <span style={{ color: 'rgba(201,168,76,0.4)', fontSize: '10px' }}>◆◆◆</span>
                  <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
                </div>
              </div>

              <div className="space-y-6">
                {cat.menu_items.map((item) => (
                  <div key={item.id} className="group relative flex gap-5 p-5 transition-all duration-500 hover:bg-white/[0.02] rounded-sm"
                    style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    {item.image_url && (
                      <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden"
                        style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
                        <Image src={item.image_url} alt={item.name} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          style={{ filter: 'sepia(15%) brightness(0.9) contrast(1.05)' }} />
                        {/* Gold corner accent */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C] opacity-70" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C] opacity-70" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h3 className="text-xl font-bold tracking-wide" style={{ color: '#E8D5A3' }}>{item.name}</h3>
                        <div className="flex-1 border-b border-dotted border-[#C9A84C]/20 mx-2 relative top-[-4px]" />
                        <span className="font-bold text-xl shrink-0" style={{ color: '#C9A84C' }}>₹{item.price}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] tracking-widest uppercase font-semibold"
                          style={{ color: item.is_veg ? 'rgba(134,239,172,0.7)' : 'rgba(252,165,165,0.7)' }}>
                          {item.is_veg ? '◈ Vegetarian' : '◈ Non-Vegetarian'}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(232,213,163,0.45)' }}>{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Ornate footer */}
        <div className="py-3 flex items-center justify-center gap-3">
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
          <span style={{ color: '#C9A84C', fontSize: '18px' }}>♦</span>
          <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, #C9A84C, transparent)' }} />
        </div>
        <footer className="text-center py-8">
          <p className="text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,168,76,0.4)', fontFamily: 'Georgia, serif' }}>
            Powered by <span style={{ color: '#C9A84C' }}>Click2Menu</span>
          </p>
        </footer>
      </div>
    </div>
  )
}
