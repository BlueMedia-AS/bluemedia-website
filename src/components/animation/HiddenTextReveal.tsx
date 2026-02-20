import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface HiddenTextRevealProps {
  text: string
  className?: string
}

export default function HiddenTextReveal({ text, className = '' }: HiddenTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const [opacity, setOpacity] = useState(0.08)
  const reduced = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reduced || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      const maxDist = 300
      const newOpacity = Math.max(0.08, 1 - dist / maxDist)
      setOpacity(newOpacity)
    },
    [reduced],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  if (reduced) {
    return (
      <p className={`text-[var(--color-text-muted)] italic ${className}`}>
        {text}
      </p>
    )
  }

  return (
    <motion.p
      ref={containerRef}
      className={`text-[var(--color-text-secondary)] italic select-none ${className}`}
      style={{ opacity }}
      transition={{ duration: 0.1 }}
    >
      {text}
    </motion.p>
  )
}
