import { motion, useReducedMotion } from 'framer-motion'

const smoothEase = [0.45, 0, 0.15, 1] as const

export default function Navbar() {
  const reduced = useReducedMotion()
  const fast = !!reduced

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-8 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: fast ? 0.01 : 1.2,
        delay: fast ? 0 : 0.3,
        ease: smoothEase,
      }}
    >
      {/* Brand */}
      <a href="#" className="group flex items-center gap-3" aria-label="BlueMedia">
        {/* Dot mark */}
        <motion.div
          className="h-2 w-2 rounded-full bg-[var(--color-accent)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: fast ? 0.01 : 0.6, delay: fast ? 0 : 0.8, ease: smoothEase }}
        />
        <span className="font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-text-primary)]">
          BlueMedia
        </span>
      </a>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span className="font-[var(--font-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Systems
        </span>
        <div className="relative flex h-1.5 w-1.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-light)] opacity-40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        </div>
      </div>
    </motion.header>
  )
}
