'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.getAttribute('role') === 'button') {
        setHovering(true)
      }
    }
    const onLeave = () => setHovering(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    // Animate ring with lag
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.style.cursor = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          borderRadius: '50%',
          background: hovering ? '#155EEF' : '#0D1117',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.1s, height 0.1s, background 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring — lagged */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: hovering ? 48 : clicking ? 24 : 32,
          height: hovering ? 48 : clicking ? 24 : 32,
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? '#155EEF' : 'rgba(13,17,23,0.25)'}`,
          background: hovering ? 'rgba(21,94,239,0.06)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.25s cubic-bezier(.34,1.56,.64,1), height 0.25s cubic-bezier(.34,1.56,.64,1), border-color 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
