import { User, Bell, Shield, Palette } from 'lucide-react'
import Image from 'next/image'

export default function SettingsPage() {
  const sections = [
    { title: 'Profile', icon: User, desc: 'Manage your personal information and restaurant details.' },
    { title: 'Notifications', icon: Bell, desc: 'Configure how you want to be alerted about your menus.' },
    { title: 'Appearance', icon: Palette, desc: 'Customize your dashboard theme and preferences.' },
    { title: 'Security', icon: Shield, desc: 'Update your password and manage account security.' },
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500 space-y-8">
      <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-[#EDE8E0] shadow-sm flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-[#1C1410] font-display">Settings</h1>
          <p className="text-[#6B635A] mt-2 max-w-sm">Manage your account, security preferences, and dashboard customisation from one place.</p>
        </div>
        <div className="w-56 h-56 relative opacity-20 pointer-events-none absolute right-0 top-0 translate-x-10">
          <Image src="/Think_different-amico.svg" alt="Innovation" fill className="object-contain" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center gap-5 hover:border-primary/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#FAF7F2] rounded-xl flex items-center justify-center text-[#6B635A] group-hover:text-primary group-hover:scale-110 transition-all">
              <section.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1C1410] mb-0.5">{section.title}</h3>
              <p className="text-sm text-[#6B635A]">{section.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 sm:p-10 bg-[#1C1410] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-3">Need help with your account?</h2>
          <p className="text-white/70 mb-8 max-w-md text-lg">Our support team is available 24/7 to assist you with any technical issues or billing questions.</p>
          <button className="bg-[#F57363] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#E05A4A] transition-all shadow-lg transform hover:-translate-y-0.5">
            Contact Support
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 group-hover:rotate-12 transition-transform duration-700">
          <Image src="/Think_different-amico.svg" alt="Support" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}
