import { motion } from 'framer-motion'

interface MonoLabelProps {
  children: string
  className?: string
}

export default function MonoLabel({ children, className = '' }: MonoLabelProps) {
  return (
    <motion.span
      className={`inline-block font-[var(--font-mono)] text-[var(--text-mono)] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)] ${className}`}
      initial={{ letterSpacing: '0.1em' }}
      whileInView={{ letterSpacing: '0.15em' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}
