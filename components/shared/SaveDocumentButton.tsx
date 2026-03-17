'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface SaveDocumentButtonProps {
  type: 'invoice' | 'contract' | 'privacy_policy' | 'terms' | 'business_names'
  title: string
  data: Record<string, unknown>
  htmlContent?: string
  className?: string
}

export function SaveDocumentButton({ type, title, data, htmlContent, className }: SaveDocumentButtonProps) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        window.location.href = '/login'
        return
      }

      // Check user plan
      const { data: user } = await supabase
        .from('users')
        .select('plan')
        .eq('id', session.user.id)
        .single()

      if (!user || user.plan === 'free') {
        alert('Save to dashboard requires a Pro plan.')
        return
      }

      const { error } = await supabase.from('documents').insert({
        user_id: session.user.id,
        type,
        title,
        data,
        html_content: htmlContent,
      })

      if (error) throw error
      setSaved(true)
    } catch (error) {
      console.error('Failed to save document:', error)
      alert('Failed to save document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleSave} disabled={loading || saved} className={className} variant="outline">
      <Save className="mr-2 h-4 w-4" />
      {saved ? 'Saved!' : loading ? 'Saving…' : 'Save to Dashboard'}
    </Button>
  )
}
