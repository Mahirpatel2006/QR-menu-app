"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { Check, Loader2, Plus, Trash2, Search, Utensils, Store, Palette } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem { name: string; description: string; price: string; is_veg: boolean }
interface Category { name: string; items: MenuItem[] }

const BUSINESS_TYPES = ['Restaurant', 'Cafe', 'Bakery', 'Food Truck', 'Bar', 'Fast Food', 'Sweet Shop', 'Other']

const THEMES = [
  { id: 'default',  label: 'Classic',  bg: '#FAF7F2', accent: '#F57363' },
  { id: 'dark',     label: 'Midnight', bg: '#1a1d23',  accent: '#F57363' },
  { id: 'green',    label: 'Fresh',    bg: '#F0FDF4',  accent: '#22C55E' },
  { id: 'purple',   label: 'Royal',    bg: '#F5F3FF',  accent: '#A78BFA' },
  { id: 'amber',    label: 'Spice',    bg: '#FFFBEB',  accent: '#F59E0B' },
]

type Tab = 'items' | 'info' | 'theme'

export default function EditMenuPage() {
  const router = useRouter()
  const { id } = useParams()
  
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [activeTab, setActiveTab] = useState<Tab>('items')
  const [searchQuery, setSearchQuery] = useState('')

  const [businessType, setBusinessType] = useState('')
  const [details, setDetails] = useState({ name: '', address: '', phone: '' })
  const [categories, setCategories] = useState<Category[]>([])
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menus/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to fetch menu')
        
        const { menu } = data
        setBusinessType(menu.restaurants.business_type || '')
        setDetails({
          name: menu.restaurants.name,
          address: menu.restaurants.address,
          phone: menu.restaurants.phone || '',
        })
        setTheme(menu.theme)
        
        if (menu.categories && menu.categories.length > 0) {
          setCategories(menu.categories.map((c: any) => ({
            name: c.name,
            items: (c.menu_items || []).map((i: any) => ({
              name: i.name,
              description: i.description || '',
              price: i.price.toString(),
              is_veg: i.is_veg || false,
            }))
          })))
        } else {
          setCategories([{ name: '', items: [] }])
        }
      } catch (err: unknown) {
        toast.error((err as Error).message)
        router.push('/dashboard/menus')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchMenu()
  }, [id, router])

  const handleSubmit = async () => {
    // Basic validation
    if (!details.name.trim() || !details.address.trim()) {
      setActiveTab('info')
      return toast.error('Restaurant name and address are required')
    }
    if (!businessType) {
      setActiveTab('info')
      return toast.error('Business type is required')
    }
    
    // Check for empty items
    for (const cat of categories) {
      if (!cat.name.trim() && categories.length > 1) {
        return toast.error('All categories must have a name')
      }
      for (const item of cat.items) {
        if (!item.name.trim() || !item.price) {
          setActiveTab('items')
          return toast.error('All menu items must have a name and price')
        }
      }
    }

    setIsSubmitting(true)
    try {
      const payload = {
        restaurant: { name: details.name, address: details.address, phone: details.phone, business_type: businessType },
        menu: { theme },
        categories: categories.map(cat => ({
          name: cat.name || 'Menu',
          items: cat.items.map(item => ({
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            is_veg: item.is_veg,
          })),
        })).filter(cat => cat.items.length > 0 || cat.name !== 'Menu'),
      }

      const res = await fetch(`/api/menus/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to update menu')

      toast.success('Menu updated successfully!')
      router.push('/dashboard/menus')
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helpers for nested state updates
  const updateItem = (cIdx: number, iIdx: number, key: keyof MenuItem, val: any) => {
    const newCats = [...categories]
    newCats[cIdx].items[iIdx] = { ...newCats[cIdx].items[iIdx], [key]: val }
    setCategories(newCats)
  }
  const addItem = (cIdx: number) => {
    const newCats = [...categories]
    newCats[cIdx].items.push({ name: '', description: '', price: '', is_veg: false })
    setCategories(newCats)
  }
  const removeItem = (cIdx: number, iIdx: number) => {
    const newCats = [...categories]
    newCats[cIdx].items.splice(iIdx, 1)
    setCategories(newCats)
  }
  const updateCatName = (cIdx: number, name: string) => {
    const newCats = [...categories]
    newCats[cIdx].name = name
    setCategories(newCats)
  }
  const removeCat = (cIdx: number) => {
    const newCats = [...categories]
    newCats.splice(cIdx, 1)
    setCategories(newCats)
  }
  const addCategory = () => setCategories([...categories, { name: '', items: [] }])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-[#6B635A] font-medium">Loading menu editor...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Header & Tabs */}
      <div className="bg-white rounded-2xl border border-[#EDE8E0] shadow-sm overflow-hidden sticky top-0 z-20">
        <div className="p-6 border-b border-[#EDE8E0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-[#1C1410]">Menu Editor</h1>
            <p className="text-[#6B635A] text-sm mt-1">Make changes and save when you're done.</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark shadow-md transition-all disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        <div className="flex px-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('items')}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
              ${activeTab === 'items' ? 'border-primary text-primary' : 'border-transparent text-[#6B635A] hover:text-[#1C1410]'}`}
          >
            <Utensils className="w-4 h-4" /> Menu Items
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
              ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-[#6B635A] hover:text-[#1C1410]'}`}
          >
            <Store className="w-4 h-4" /> Restaurant Info
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
              ${activeTab === 'theme' ? 'border-primary text-primary' : 'border-transparent text-[#6B635A] hover:text-[#1C1410]'}`}
          >
            <Palette className="w-4 h-4" /> Theme & Design
          </button>
        </div>
      </div>

      {/* ─── TAB: Menu Items ────────────────────────────────────────────── */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-4 shadow-sm flex items-center gap-3">
            <Search className="w-5 h-5 text-[#A09588]" />
            <input
              type="text"
              placeholder="Search items to edit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-[#1C1410] placeholder-[#A09588] outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-[#6B635A] hover:text-[#1C1410] font-medium">Clear</button>
            )}
          </div>

          <div className="space-y-6">
            {categories.map((cat, cIdx) => {
              const query = searchQuery.toLowerCase()
              const catMatches = cat.name.toLowerCase().includes(query)
              const hasMatchingItems = cat.items.some(i => i.name.toLowerCase().includes(query) || i.description.toLowerCase().includes(query))
              
              if (query && !catMatches && !hasMatchingItems) return null

              return (
                <div key={cIdx} className="bg-white rounded-2xl border border-[#EDE8E0] shadow-sm overflow-hidden">
                  <div className="bg-[#FAF7F2] p-4 border-b border-[#EDE8E0] flex flex-col sm:flex-row sm:items-center gap-4">
                    <input
                      value={cat.name}
                      onChange={(e) => updateCatName(cIdx, e.target.value)}
                      placeholder="Category Name (e.g., Starters)"
                      className="flex-1 px-4 py-2 bg-white border border-[#EDE8E0] rounded-xl font-bold text-[#1C1410] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => removeCat(cIdx)}
                      className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 self-start sm:self-auto"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Category
                    </button>
                  </div>
                  
                  <div className="p-2 sm:p-4 divide-y divide-[#EDE8E0]">
                    {cat.items.map((item, iIdx) => {
                      const itemMatches = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
                      if (query && !catMatches && !itemMatches) return null

                      return (
                        <div key={iIdx} className="py-4 px-2 sm:px-4 group transition-colors hover:bg-[#FAF7F2]/50 rounded-xl">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-4 space-y-3">
                              <div>
                                <label className="block text-xs font-semibold text-[#A09588] uppercase tracking-wider mb-1">Item Name</label>
                                <input
                                  value={item.name}
                                  onChange={(e) => updateItem(cIdx, iIdx, 'name', e.target.value)}
                                  placeholder="e.g., Garlic Bread"
                                  className="w-full px-3 py-2 bg-white border border-[#EDE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                                />
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.is_veg}
                                  onChange={(e) => updateItem(cIdx, iIdx, 'is_veg', e.target.checked)}
                                  className="accent-green-500 w-4 h-4 rounded"
                                />
                                <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">Vegetarian</span>
                              </label>
                            </div>
                            
                            <div className="md:col-span-2">
                              <label className="block text-xs font-semibold text-[#A09588] uppercase tracking-wider mb-1">Price</label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B635A] font-medium">₹</span>
                                <input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => updateItem(cIdx, iIdx, 'price', e.target.value)}
                                  placeholder="0.00"
                                  min="0"
                                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#EDE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                                />
                              </div>
                            </div>
                            
                            <div className="md:col-span-5">
                              <label className="block text-xs font-semibold text-[#A09588] uppercase tracking-wider mb-1">Description</label>
                              <textarea
                                value={item.description}
                                onChange={(e) => updateItem(cIdx, iIdx, 'description', e.target.value)}
                                placeholder="Add a short description..."
                                rows={2}
                                className="w-full px-3 py-2 bg-white border border-[#EDE8E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                              />
                            </div>
                            
                            <div className="md:col-span-1 flex items-center justify-end">
                              <button
                                onClick={() => removeItem(cIdx, iIdx)}
                                className="p-2 text-[#A09588] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="pt-4 px-2 sm:px-4">
                      <button
                        onClick={() => addItem(cIdx)}
                        className="flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors text-sm px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary/10"
                      >
                        <Plus className="w-4 h-4" /> Add Item to {cat.name || 'Category'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            
            <button
              onClick={addCategory}
              className="w-full py-4 border-2 border-dashed border-[#EDE8E0] rounded-2xl text-[#6B635A] font-semibold hover:text-[#1C1410] hover:border-[#1C1410] hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add New Category
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB: Restaurant Info ───────────────────────────────────────── */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm space-y-6 max-w-3xl">
          <div>
            <label className="block text-sm font-bold text-[#1C1410] mb-3">Business Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BUSINESS_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBusinessType(type)}
                  className={`p-3 rounded-xl border-2 text-sm font-medium transition-all text-center
                    ${businessType === type ? 'border-primary bg-[#FDDDD8] text-primary' : 'border-[#EDE8E0] text-[#6B635A] hover:border-primary/40'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-[#EDE8E0]">
            <div>
              <label className="block text-sm font-bold text-[#1C1410] mb-1">Restaurant Name *</label>
              <input
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                placeholder="e.g. The Spice Garden"
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1C1410] mb-1">Address *</label>
              <input
                value={details.address}
                onChange={(e) => setDetails({ ...details, address: e.target.value })}
                placeholder="e.g. 12 MG Road, Bengaluru"
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1C1410] mb-1">Phone Number (optional)</label>
              <input
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: Theme ─────────────────────────────────────────────────── */}
      {activeTab === 'theme' && (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1C1410] mb-5">Choose a Theme</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`rounded-2xl border-2 overflow-hidden transition-all text-left
                  ${theme === t.id ? 'border-primary ring-2 ring-primary ring-offset-4' : 'border-[#EDE8E0] hover:border-primary/40'}`}
              >
                <div className="h-24 p-3" style={{ backgroundColor: t.bg }}>
                  <div className="w-1/2 h-3 rounded-full mb-2" style={{ backgroundColor: t.accent }} />
                  <div className="w-3/4 h-2 rounded-full mb-2 opacity-40" style={{ backgroundColor: t.accent }} />
                  <div className="w-5/6 h-2 rounded-full opacity-40" style={{ backgroundColor: t.accent }} />
                </div>
                <div className="p-3 border-t border-[#EDE8E0] bg-white">
                  <div className="text-sm font-bold text-[#1C1410]">{t.label}</div>
                  <div className="text-xs text-[#6B635A] mt-0.5 capitalize">{t.id} style</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
