'use client'

import { useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'

interface SafeHtmlProps {
  html: string
  id?: string
  className?: string
}

// Renders AI-generated HTML safely. DOMPurify sanitizes before any DOM write.
export function SafeHtml({ html, id, className }: SafeHtmlProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','ul','ol','li',
        'strong','em','a','br','hr','table','thead','tbody','tr','th','td',
        'blockquote','code','pre','span','div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
      FORCE_BODY: true,
    })
    // Safe: content is DOMPurify-sanitized above
    // eslint-disable-next-line no-unsanitized/property
    ref.current.innerHTML = clean
  }, [html])

  return <div ref={ref} id={id} className={className} />
}
