import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassPanel({ children, className = '', hover = true }: GlassPanelProps) {
  return (
    <motion.div
      className={`rounded-[var(--glass-radius)] border border-[var(--glass-border)] p-6 md:p-8 ${className}`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        boxShadow: 'var(--glass-shadow)',
      }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: 'var(--glass-shadow-hover)',
              background: 'var(--glass-bg-hover)',
              borderColor: 'var(--glass-border-hover)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
