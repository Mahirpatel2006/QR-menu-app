"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChevronRight, ChevronLeft, Check, Loader2, Plus, Trash2 } from 'lucide-react'

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

const STEPS = ['Business Type', 'Details', 'Menu Builder', 'Theme', 'Review']

// ─── Step components ──────────────────────────────────────────────────────────
function Step1({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BUSINESS_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`p-4 rounded-xl border-2 text-sm font-medium transition-all text-center
            ${value === type ? 'border-primary bg-[#FDDDD8] text-primary' : 'border-[#EDE8E0] text-[#6B635A] hover:border-primary/40'}`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

function Step2({ data, onChange }: { data: any; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      {[['name', 'Restaurant Name *', 'e.g. The Spice Garden'], ['address', 'Address *', 'e.g. 12 MG Road, Bengaluru'], ['phone', 'Phone (optional)', '+91 98765 43210']].map(([key, label, placeholder]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-[#1C1410] mb-1">{label}</label>
          <input
            value={data[key] ?? ''}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-[#1C1410] font-medium transition-all"
          />
        </div>
      ))}
    </div>
  )
}

function Step3({ categories, onChange }: { categories: Category[]; onChange: (cats: Category[]) => void }) {
  const addCategory = () => onChange([...categories, { name: '', items: [] }])
  const removeCategory = (i: number) => onChange(categories.filter((_, idx) => idx !== i))
  const updateCategoryName = (i: number, name: string) => {
    const updated = [...categories]
    updated[i] = { ...updated[i], name }
    onChange(updated)
  }

  const addItem = (catIdx: number) => {
    const updated = categories.map((cat, ci) =>
      ci === catIdx ? { ...cat, items: [...cat.items, { name: '', description: '', price: '', is_veg: true }] } : cat
    )
    onChange(updated)
  }

  const updateItem = (catIdx: number, itemIdx: number, key: keyof MenuItem, value: string | boolean) => {
    const updated = categories.map((cat, ci) => {
      if (ci !== catIdx) return cat
      const items = cat.items.map((item, ii) => ii === itemIdx ? { ...item, [key]: value } : item)
      return { ...cat, items }
    })
    onChange(updated)
  }

  const removeItem = (catIdx: number, itemIdx: number) => {
    const updated = categories.map((cat, ci) =>
      ci === catIdx ? { ...cat, items: cat.items.filter((_, ii) => ii !== itemIdx) } : cat
    )
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="bg-white rounded-2xl border border-[#EDE8E0] shadow-sm overflow-hidden transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5">
          {/* Category Header */}
          <div className="bg-[#FAF7F2] p-4 border-b border-[#EDE8E0] flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-sm">
              {catIdx + 1}
            </span>
            <input
              value={cat.name}
              onChange={(e) => updateCategoryName(catIdx, e.target.value)}
              placeholder="Category Name (e.g. Starters, Mains)"
              className="flex-1 bg-transparent text-lg font-bold text-[#1C1410] placeholder:text-[#A09588] focus:outline-none focus:border-b-2 focus:border-primary px-1 transition-all"
            />
            <button
              type="button"
              onClick={() => removeCategory(catIdx)}
              className="p-2 text-[#A09588] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Category Items */}
          <div className="p-4 space-y-4">
            {cat.items.map((item, itemIdx) => (
              <div key={itemIdx} className="relative bg-white border border-[#EDE8E0] rounded-xl p-4 hover:border-primary/30 transition-all group">
                <div className="absolute top-4 right-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                   <button type="button" onClick={() => removeItem(catIdx, itemIdx)} className="p-1.5 text-[#A09588] hover:text-red-500 bg-white rounded-md shadow-sm border border-[#EDE8E0]">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-3 pr-10">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-[#A09588] uppercase tracking-wider mb-1 block">Item Name *</label>
                    <input
                      value={item.name}
                      onChange={(e) => updateItem(catIdx, itemIdx, 'name', e.target.value)}
                      placeholder="e.g. Margherita Pizza"
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold text-[#1C1410]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <label className="text-[10px] font-bold text-[#A09588] uppercase tracking-wider mb-1 block">Price (₹) *</label>
                    <input
                      value={item.price}
                      onChange={(e) => updateItem(catIdx, itemIdx, 'price', e.target.value)}
                      placeholder="299"
                      type="number"
                      min="0"
                      step="0.5"
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold text-[#1C1410]"
                    />
                  </div>
                  <div className="w-full md:w-32">
                     <label className="text-[10px] font-bold text-[#A09588] uppercase tracking-wider mb-1 block">Dietary</label>
                     <button
                        type="button"
                        onClick={() => updateItem(catIdx, itemIdx, 'is_veg', !item.is_veg)}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-bold transition-all ${item.is_veg ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#166534]' : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#991B1B]'}`}
                     >
                       <div className={`w-2.5 h-2.5 rounded-full ${item.is_veg ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`} />
                       {item.is_veg ? 'Veg' : 'Non-Veg'}
                     </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#A09588] uppercase tracking-wider mb-1 block">Description</label>
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(catIdx, itemIdx, 'description', e.target.value)}
                    placeholder="Short appetizing description..."
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EDE8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-[#6B635A]"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem(catIdx)}
              className="w-full py-3.5 border-2 border-dashed border-[#EDE8E0] rounded-xl text-[#A09588] font-bold text-sm flex items-center justify-center gap-2 hover:border-primary/50 hover:text-primary transition-all bg-[#FAF7F2]/50 hover:bg-[#FAF7F2]"
            >
              <Plus className="w-4 h-4" /> Add Item to {cat.name || `Category ${catIdx + 1}`}
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="w-full py-4 bg-white border border-[#EDE8E0] rounded-2xl text-primary font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-[#FAF7F2] transition-colors"
      >
        <Plus className="w-5 h-5" /> Add New Category
      </button>
    </div>
  )
}

function Step4({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onChange(theme.id)}
          className={`rounded-2xl border-2 overflow-hidden transition-all
            ${value === theme.id ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-[#EDE8E0] hover:border-primary/40'}`}
        >
          <div className="h-16" style={{ backgroundColor: theme.bg }}>
            <div className="h-2 mt-4 mx-3 rounded-full" style={{ backgroundColor: theme.accent }} />
            <div className="h-1.5 mt-1 mx-5 rounded-full opacity-40" style={{ backgroundColor: theme.accent }} />
          </div>
          <div className="p-2 text-xs font-medium text-[#1C1410] text-center bg-white">{theme.label}</div>
        </button>
      ))}
    </div>
  )
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────
export default function NewMenuPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [businessType, setBusinessType] = useState('')
  const [details, setDetails] = useState({ name: '', address: '', phone: '' })
  const [categories, setCategories] = useState<Category[]>([{ name: '', items: [] }])
  const [theme, setTheme] = useState('default')

  const updateDetail = (key: string, value: string) => setDetails(d => ({ ...d, [key]: value }))

  const canAdvance = () => {
    if (step === 0) return businessType !== ''
    if (step === 1) return details.name.trim() !== '' && details.address.trim() !== ''
    if (step === 2) return categories.length > 0 && categories.every(c => c.name.trim() !== '' && c.items.length > 0 && c.items.every(i => i.name.trim() !== '' && i.price !== ''))
    return true
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        restaurant: { name: details.name, address: details.address, phone: details.phone, business_type: businessType },
        menu: { theme },
        categories: categories.map(cat => ({
          name: cat.name,
          items: cat.items.map(item => ({
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            is_veg: item.is_veg,
          })),
        })),
      }

      const res = await fetch('/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.status === 403) {
        sessionStorage.setItem('pendingMenu', JSON.stringify(payload))
        toast.error('Menu limit reached. Please select a plan to continue.')
        router.push('/dashboard/billing')
        return
      }

      if (!res.ok) throw new Error(data.error || 'Failed to create menu')

      toast.success('Menu created successfully!')
      router.push('/dashboard/qr')
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display text-[#1C1410]">Create a New Menu</h1>
        <p className="text-[#6B635A] mt-1">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300
              ${i <= step ? 'bg-primary' : 'bg-[#EDE8E0]'}`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 md:p-8 shadow-sm min-h-[280px]">
        <h2 className="text-xl font-bold text-[#1C1410] mb-6">{STEPS[step]}</h2>
        {step === 0 && <Step1 value={businessType} onChange={setBusinessType} />}
        {step === 1 && <Step2 data={details} onChange={updateDetail} />}
        {step === 2 && <Step3 categories={categories} onChange={setCategories} />}
        {step === 3 && <Step4 value={theme} onChange={setTheme} />}
        {step === 4 && (
          <div className="space-y-4">
            <div className="bg-[#FAF7F2] rounded-xl p-6 space-y-3 text-sm border border-[#EDE8E0]">
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Business Type</span><span className="font-bold text-[#1C1410]">{businessType}</span></div>
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Name</span><span className="font-bold text-[#1C1410]">{details.name}</span></div>
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Address</span><span className="font-bold text-[#1C1410]">{details.address}</span></div>
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Categories</span><span className="font-bold text-[#1C1410]">{categories.length}</span></div>
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Total Items</span><span className="font-bold text-[#1C1410]">{categories.reduce((s, c) => s + c.items.length, 0)}</span></div>
              <div className="flex justify-between"><span className="text-[#A09588] font-semibold uppercase tracking-wider text-xs">Theme</span><span className="font-bold text-[#1C1410] capitalize">{THEMES.find(t => t.id === theme)?.label}</span></div>
            </div>
            <p className="text-sm text-[#6B635A] bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
              <span className="text-xl">ℹ️</span>
              If you are creating your first menu or have reached your plan limit, you will be prompted to choose a subscription before publishing.
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pb-12">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-2 text-[#6B635A] font-bold px-6 py-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-[#EDE8E0] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:border-transparent"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canAdvance()}
            className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:hover:shadow-none"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:hover:shadow-none"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
            {isSubmitting ? 'Creating...' : 'Create Menu'}
          </button>
        )}
      </div>
    </div>
  )
}
