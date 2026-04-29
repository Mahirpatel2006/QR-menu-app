'use client';

import Link from 'next/link'
import Image from 'next/image'
import { UtensilsCrossed, QrCode, Smartphone, Star, ChevronRight, Zap, Shield, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: QrCode, title: 'Instant QR Codes', desc: 'Generate a scannable QR code the moment your menu is ready. No app needed for customers.' },
  { icon: Smartphone, title: 'Mobile-First Menus', desc: 'Beautiful, fast menu pages optimised for every phone screen — no pinching required.' },
  { icon: TrendingUp, title: 'Multiple Menus', desc: 'Run a café and a catering arm? Manage multiple menus from one dashboard.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Built on Supabase with row-level security. Your data stays yours.' },
  { icon: Zap, title: 'Live Updates', desc: 'Edit your menu anytime. Customers always see the latest version within minutes.' },
  { icon: Star, title: 'Custom Themes', desc: 'Pick a colour theme that matches your brand — Classic, Midnight, Fresh, Royal, or Spice.' },
]

const plans = [
  { name: 'Starter', price: 50, menus: '1 menu', features: ['Basic themes', 'QR code generation', 'Live updates'], color: 'border-[#EDE8E0]' },
  { name: 'Pro', price: 100, menus: 'Up to 3 menus', features: ['Premium themes', 'Analytics tracking', 'Priority support'], color: 'border-[#F57363] ring-4 ring-[#F57363]/20', badge: 'Most Popular' },
  { name: 'Unlimited', price: 200, menus: 'Unlimited menus', features: ['All Pro features', 'White-label QR codes', 'Custom domain setup'], color: 'border-[#EDE8E0]' },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Click2Menu",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "description": "Create beautiful, contactless digital menus for your restaurant, cafe, or bar. Generate QR codes instantly, manage multiple menus, and track analytics.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1410] overflow-hidden selection:bg-[#F57363]/20" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-16 py-4 sm:py-5 border-b border-[#EDE8E0] bg-[#FAF7F2]/80 backdrop-blur-md fixed w-full top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
         
          <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ fontFamily: '"Playfair Display SC", serif', color: '#1C1410' }}>
            Click2Menu
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/signin" className="hidden sm:block text-sm font-semibold text-[#6B635A] hover:text-[#1C1410] transition-colors">
            Sign in
          </Link>
          <Link
            href="/register"
            className="bg-[#1C1410] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#F57363] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[10%] w-[40rem] h-[40rem] bg-[#FDDDD8] rounded-full blur-3xl opacity-40 pointer-events-none -z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-[10%] w-[35rem] h-[35rem] bg-[#FEF3C7] rounded-full blur-3xl opacity-40 pointer-events-none -z-10"
        />


        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold bg-white border border-[#EDE8E0] text-[#1C1410] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 h-4 text-[#F57363]" />
              THE NEW STANDARD FOR DIGITAL MENUS
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 sm:mb-8 tracking-tight"
            style={{ fontFamily: '"Playfair Display SC", serif' }}
          >
            Your menu,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F57363] to-[#FF9B8F]">
              one scan away.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-[#6B635A] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-medium px-4"
          >
            Create a beautiful, lightning-fast digital menu in minutes. Share it via QR code. Let customers browse seamlessly from their phones.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
          >
            <Link
              href="/register"
              className="group flex items-center justify-center gap-2 bg-[#F57363] text-white font-bold px-8 py-3 sm:py-4 rounded-full hover:bg-[#E05A4A] shadow-[0_8px_30px_rgb(245,115,99,0.3)] hover:shadow-[0_8px_40px_rgb(245,115,99,0.4)] transition-all text-base sm:text-lg w-full sm:w-auto"
            >
              Start for free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-center gap-2 bg-white border border-[#EDE8E0] text-[#1C1410] font-bold px-8 py-3 sm:py-4 rounded-full hover:bg-[#FAF7F2] transition-all text-base sm:text-lg w-full sm:w-auto shadow-sm"
            >
              See how it works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Illustration Section */}
      <section className="px-6 lg:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-[#1C1410]" style={{ fontFamily: '"Playfair Display SC", serif' }}>
              Create an Experience, <br />Not Just a List
            </h2>
            <p className="text-[#6B635A] text-lg leading-relaxed mb-6">
              Your menu is the heart of your business. Give it the digital spotlight it deserves with our modern, scannable QR solutions.
            </p>
            <ul className="space-y-4">
              {['Interactive & Visual', 'No App Downloads', 'Instant Live Updates'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#1C1410] font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-[#F57363]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="order-1 md:order-2"
          >
            <Image
              src="/Coffee_shop-amico.svg"
              alt="Coffee shop illustration"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 lg:px-16 py-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#1C1410]"
              style={{ fontFamily: '"Playfair Display SC", serif' }}
            >
              Everything you need to <br className="hidden md:block" /> run your digital menu
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="text-[#6B635A] text-lg md:text-xl max-w-2xl mx-auto"
            >
              Built specifically for modern hospitality. Powerful enough to scale with your business, simple enough to set up in minutes.
            </motion.p>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-[#FAF7F2] rounded-[2rem] p-8 border border-[#EDE8E0] transition-colors hover:border-[#F57363]/30 hover:bg-white hover:shadow-[0_8px_30px_rgb(28,20,16,0.04)] group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#F57363]" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-[#1C1410]">{title}</h3>
                <p className="text-[#6B635A] text-base leading-relaxed font-medium">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Versatility Section */}
      <section className="px-6 lg:px-16 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-[#1C1410]" style={{ fontFamily: '"Playfair Display SC", serif' }}>
              Built for Every Business
            </h2>
            <p className="text-[#6B635A] mt-4 text-lg">Scale your business with specialized digital menus.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 border border-[#EDE8E0] flex flex-col items-center text-center hover:border-[#F57363]/30 transition-all group">
              <div className="h-48 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Image src="/bakery_shop-pana.svg" alt="Bakery" width={200} height={200} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-1">Bakery</h3>
              <p className="text-sm text-[#6B635A]">Showcase fresh treats with visual menus.</p>
            </div>
            <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 border border-[#EDE8E0] flex flex-col items-center text-center hover:border-[#F57363]/30 transition-all group">
              <div className="h-48 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Image src="/Order_food-rafiki.svg" alt="Restaurant" width={200} height={200} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-1">Restaurant</h3>
              <p className="text-sm text-[#6B635A]">Full course dining experiences made easy.</p>
            </div>
            <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 border border-[#EDE8E0] flex flex-col items-center text-center hover:border-[#F57363]/30 transition-all group">
              <div className="h-48 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Image src="/Coffee_shop-amico.svg" alt="Cafe" width={200} height={200} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-1">Cafe</h3>
              <p className="text-sm text-[#6B635A]">Perfect for quick-serve coffee shops.</p>
            </div>
            <div className="bg-[#FAF7F2] rounded-[2.5rem] p-6 border border-[#EDE8E0] flex flex-col items-center text-center hover:border-[#F57363]/30 transition-all group">
              <div className="h-48 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Image src="/Bar_shop-bro.svg" alt="Bar" width={200} height={200} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-1">Bar & Lounge</h3>
              <p className="text-sm text-[#6B635A]">Stunning cocktail lists and drink menus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 lg:px-16 py-32 bg-[#FAF7F2] text-[#1C1410] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FDDDD8] rounded-full blur-[120px] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#1C1410]"
              style={{ fontFamily: '"Playfair Display SC", serif' }}
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="text-[#6B635A] text-lg md:text-xl max-w-2xl mx-auto"
            >
              Start for free, upgrade when you need more power. Cancel anytime.
            </motion.p>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeIn}
                className={`relative bg-white rounded-[2.5rem] p-8 md:p-10 border ${plan.badge ? 'border-[#F57363] ring-4 ring-[#F57363]/20 md:-translate-y-4 shadow-[0_20px_60px_-15px_rgba(245,115,99,0.3)]' : 'border-[#EDE8E0] shadow-sm hover:shadow-md hover:border-[#F57363]/30 transition-all'}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F57363] to-[#FF9B8F] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <div className="text-xl font-bold mb-4 text-[#1C1410]">{plan.name}</div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#1C1410]">₹{plan.price}</span>
                  <span className="text-lg font-normal text-[#6B635A]">/mo</span>
                </div>
                <div className={`text-sm font-semibold mb-8 py-2 px-4 rounded-lg inline-block ${plan.badge ? 'bg-[#F57363] text-white' : 'bg-[#FDDDD8] text-[#F57363]'}`}>
                  {plan.menus}
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#6B635A] font-medium">
                      <CheckCircle2 className={`w-5 h-5 ${plan.badge ? 'text-[#F57363]' : 'text-[#6B635A]/50'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block w-full text-center font-bold rounded-full py-4 transition-all ${plan.badge
                      ? 'bg-[#F57363] text-white hover:bg-[#E05A4A] shadow-lg hover:shadow-[#F57363]/50'
                      : 'bg-[#FAF7F2] text-[#1C1410] border border-[#EDE8E0] hover:bg-[#FDDDD8] hover:border-[#F57363]/30 hover:text-[#F57363]'
                    }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:py-32 bg-white text-center relative overflow-hidden">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="w-20 h-20 bg-[#FDDDD8] rounded-3xl mx-auto flex items-center justify-center mb-8 ">
            <UtensilsCrossed className="w-10 h-10 text-[#F57363] -rotate-12" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#1C1410]" style={{ fontFamily: '"Playfair Display SC", serif' }}>
            Ready to modernise your menu?
          </h2>
          <p className="mb-10 text-[#6B635A] text-xl font-medium max-w-2xl mx-auto">
            Join hundreds of forward-thinking restaurants delivering a better dining experience with Click2Menu.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-[#1C1410] text-white font-bold px-10 py-5 rounded-full hover:bg-[#F57363] transition-colors shadow-2xl hover:shadow-[#F57363]/40 transform hover:-translate-y-1 text-lg"
          >
            Create Your First Menu
            <ChevronRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF7F2] border-t border-[#EDE8E0] text-[#6B635A] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#F57363] p-1.5 rounded-lg">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1C1410]" style={{ fontFamily: '"Playfair Display SC", serif' }}>
              Click2Menu
            </span>
          </div>
          <div className="text-sm font-medium">
            © {new Date().getFullYear()} Click2Menu. Built for modern restaurants.
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            <Link href="#" className="hover:text-[#F57363] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#F57363] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#F57363] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}