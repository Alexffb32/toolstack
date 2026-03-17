'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface PdfDownloadButtonProps {
  targetId: string
  filename?: string
  className?: string
}

export function PdfDownloadButton({ targetId, filename = 'document.pdf', className }: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      // Dynamically import html2pdf to keep bundle small
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById(targetId)
      if (!element) return

      const options = {
        margin: 10,
        filename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      }

      await html2pdf().set(options).from(element).save()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={loading} className={className} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      {loading ? 'Generating PDF…' : 'Download PDF'}
    </Button>
  )
}
