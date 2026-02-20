import { motion } from 'framer-motion'

export default function ScrollIndicator({ label = 'Utforsk' }: { label?: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="18"
            height="26"
            rx="9"
            stroke="var(--color-text-muted)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="10"
            cy="9"
            r="2.5"
            fill="var(--color-accent-light)"
            animate={{ cy: [9, 18, 9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
