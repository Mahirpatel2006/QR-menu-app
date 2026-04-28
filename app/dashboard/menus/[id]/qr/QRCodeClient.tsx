"use client"

import { useRef } from 'react'
import QRCode from 'react-qr-code'
import { Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function QRCodeClient({ menuUrl, menuSlug }: { menuUrl: string; menuSlug: string }) {
  const qrRef = useRef<HTMLDivElement>(null)

  const copyLink = async () => {
    await navigator.clipboard.writeText(menuUrl)
    toast.success('Link copied!')
  }

  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return
    const data = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([data], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${menuSlug}-qr.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPNG = () => {
    const svg = qrRef.current?.querySelector('svg')
    if (!svg) return
    const canvas = document.createElement('canvas')
    const size = 400
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    const data = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([data], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, size, size)
      ctx.drawImage(img, 0, 0, size, size)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `${menuSlug}-qr.png`
      a.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E0] shadow-sm p-8 space-y-6">
      {/* QR Code */}
      <div ref={qrRef} className="flex items-center justify-center p-6 bg-[#FAF7F2] rounded-xl">
        <QRCode value={menuUrl} size={220} fgColor="#1C1410" bgColor="#FAF7F2" />
      </div>

      {/* Menu URL */}
      <div>
        <label className="text-xs font-semibold text-[#A09588] uppercase tracking-wider block mb-1.5">Menu URL</label>
        <div className="flex items-center gap-2 bg-[#F5F1EB] rounded-xl px-4 py-3">
          <span className="text-sm text-[#1C1410] flex-1 truncate">{menuUrl}</span>
          <button onClick={copyLink} className="text-[#6B635A] hover:text-primary transition-colors shrink-0">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Download buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={downloadPNG}
          className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary-dark transition-colors shadow-md"
        >
          <Download className="w-4 h-4" /> Download PNG
        </button>
        <button
          onClick={downloadSVG}
          className="flex items-center justify-center gap-2 bg-[#F5F1EB] text-[#1C1410] rounded-xl py-3 font-semibold hover:bg-[#EDE8E0] transition-colors"
        >
          <Download className="w-4 h-4" /> Download SVG
        </button>
      </div>
    </div>
  )
}
