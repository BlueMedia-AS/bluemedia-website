import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { LogoBMAS } from '../icons'

const links = [
  { label: 'Visjon', href: '#visjon' },
  { label: 'Områder', href: '#omrader' },
  { label: 'Initiativer', href: '#initiativer' },
  { label: 'Om', href: '#om' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()

  // Slight background opacity boost on scroll
  const bgOpacity = useTransform(scrollY, [0, 120], [0.4, 0.65])
  const borderOpacity = useTransform(scrollY, [0, 120], [0.15, 0.35])
  const shadow = useTransform(
    scrollY,
    [0, 120],
    ['0 2px 16px rgba(0,0,0,0.02)', '0 4px 24px rgba(0,0,0,0.06)'],
  )

  return (
    <motion.nav
      className="fixed top-6 left-1/2 z-[60] -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.01 : 1,
        delay: reduced ? 0 : 0.3,
        ease: [0.45, 0, 0.15, 1],
      }}
      aria-label="Hovednavigasjon"
    >
      <motion.div
        className="flex items-center gap-1 rounded-full border px-2 py-1.5"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`),
          borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: shadow,
        }}
      >
        {/* Logo mark */}
        <a
          href="#"
          className="flex items-center rounded-full px-3 py-1.5 transition-colors duration-200 hover:bg-white/30"
          aria-label="Til toppen"
        >
          <LogoBMAS size={18} className="text-[var(--color-accent)]" />
        </a>

        {/* Divider */}
        <div className="mx-1 h-4 w-px bg-[var(--color-text-muted)] opacity-15" aria-hidden="true" />

        {/* Links */}
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-3.5 py-1.5 font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-white/30 hover:text-[var(--color-text-primary)]"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </motion.nav>
  )
}
