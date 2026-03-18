'use client'

import React, { useRef, useEffect, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

/* ─────────────────────────────────────────────
   FadeUp — fade + slide up on scroll into view
───────────────────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   FadeIn — simple opacity fade on scroll
───────────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   StaggerChildren — staggers direct children
───────────────────────────────────────────── */
export function StaggerChildren({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Tilt3D — 3D mouse tilt effect on cards
───────────────────────────────────────────── */
export function Tilt3D({
  children,
  className = '',
  intensity = 8,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [gX, setGX] = useState(50)
  const [gY, setGY] = useState(50)

  const springConfig = { stiffness: 200, damping: 20 }
  const springX = useSpring(rotX, springConfig)
  const springY = useSpring(rotY, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotY((x - 0.5) * intensity * 2)
    setRotX(-(y - 0.5) * intensity * 2)
    setGX(x * 100)
    setGY(y * 100)
  }

  const handleMouseLeave = () => {
    setRotX(0)
    setRotY(0)
    setGX(50)
    setGY(50)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${gX}% ${gY}%, oklch(1 0 0 / 12%) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   ParallaxSection — scroll-driven Y parallax
───────────────────────────────────────────── */
export function ParallaxSection({
  children,
  className = '',
  speed = 0.3,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -80}px`, `${speed * 80}px`])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ScaleOnHover — subtle scale on hover
───────────────────────────────────────────── */
export function ScaleOnHover({
  children,
  className = '',
  scale = 1.02,
}: {
  children: ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   CountUp — animated number counter
───────────────────────────────────────────── */
export function CountUp({
  end,
  suffix = '',
  duration = 1.5,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setValue(end); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   FloatingBlob — animated background blob
───────────────────────────────────────────── */
export function FloatingBlob({
  className = '',
  delay = 0,
  style,
}: {
  className?: string
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
