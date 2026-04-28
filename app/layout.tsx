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

export const metadata = {
  title: 'Click2Menu - QR Menu Platform',
  description: 'Digital restaurant menu platform with QR code integration.',
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
