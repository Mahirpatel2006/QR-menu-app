import { Playfair_Display_SC, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import "./globals.css"

const playfair = Playfair_Display_SC({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-playfair' 
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta'
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://click2menu.vercel.app'),
  title: {
    default: 'Click2Menu | Generate QR Code for Restaurant Menus',
    template: '%s | Click2Menu'
  },
  description: 'Create beautiful, contactless digital menus for your restaurant, cafe, or bar. Generate QR codes instantly, manage multiple menus, and track analytics.',
  keywords: ['QR code menu', 'digital restaurant menu', 'create QR code for menu', 'contactless menu', 'restaurant menu maker', 'QR menu generator', 'Click2Menu', 'free QR menu'],
  authors: [{ name: 'Click2Menu' }],
  creator: 'Click2Menu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://click2menu.vercel.app',
    title: 'Click2Menu | Generate QR Code for Restaurant Menus',
    description: 'Create beautiful, contactless digital menus for your restaurant, cafe, or bar. Generate QR codes instantly, manage multiple menus, and track analytics.',
    siteName: 'Click2Menu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click2Menu | Generate QR Code for Restaurant Menus',
    description: 'Create beautiful, contactless digital menus for your restaurant, cafe, or bar. Generate QR codes instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1C1410] font-sans antialiased min-h-screen flex flex-col">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
