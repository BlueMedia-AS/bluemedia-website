import { motion } from 'framer-motion'
import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import Reveal from '../components/animation/Reveal'
import NodeNetwork from '../components/animation/NodeNetwork'
import { LogoBMAS } from '../components/icons'
import { footer } from '../content/no'

const smoothEase = [0.45, 0, 0.15, 1] as const

const footerLinks = [
  { label: 'Visjon', href: '#visjon' },
  { label: 'Områder', href: '#omrader' },
  { label: 'Initiativer', href: '#initiativer' },
  { label: 'Om BMAS', href: '#om' },
]

export default function Footer() {
  return (
    <Section as="footer" className="relative overflow-hidden pb-12 pt-24">
      {/* Top decorative line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" aria-hidden="true">
        <div
          className="h-px w-[60%] max-w-xl"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--color-text-muted) 50%, transparent 100%)',
            opacity: 0.12,
          }}
        />
      </div>

      {/* Node network as full background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <NodeNetwork className="opacity-70" />
      </div>

      <Container wide className="relative z-10">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr]">
          {/* Left — brand */}
          <div className="flex flex-col items-start">
            <Reveal variant="fadeUp">
              {/* Logo placeholder */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-text-muted)]/10 bg-white/30">
                <span className="font-[var(--font-primary)] text-lg font-bold text-[var(--color-accent)]">B</span>
              </div>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.1}>
              <LogoBMAS size={28} className="mb-4 text-[var(--color-text-primary)]" />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.2}>
              <p
                className="max-w-xs text-[var(--color-text-secondary)]"
                style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-relaxed)' }}
              >
                {footer.tagline}
              </p>
            </Reveal>
          </div>

          {/* Center divider */}
          <div className="hidden items-stretch md:flex" aria-hidden="true">
            <div
              className="w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, var(--color-text-muted) 50%, transparent 100%)',
                opacity: 0.15,
              }}
            />
          </div>
          <div className="h-px w-full md:hidden" aria-hidden="true"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, var(--color-text-muted) 50%, transparent 100%)',
              opacity: 0.12,
            }}
          />

          {/* Right — links + info */}
          <div className="flex flex-col items-start md:items-end">
            <Reveal variant="fadeUp">
              <span className="mb-4 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
                // Navigasjon
              </span>
            </Reveal>
            <nav className="flex flex-col gap-2 md:items-end" aria-label="Bunntekst navigasjon">
              {footerLinks.map((link, i) => (
                <Reveal key={link.href} variant="fadeUp" delay={0.1 + i * 0.06}>
                  <a
                    href={link.href}
                    className="text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)]"
                    style={{ fontSize: 'var(--text-small)' }}
                  >
                    {link.label}
                  </a>
                </Reveal>
              ))}
            </nav>

            <Reveal variant="fadeUp" delay={0.4}>
              <div className="mt-8 flex flex-col gap-1 md:items-end">
                <span className="font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
                  // Kontakt
                </span>
                <span
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--text-small)' }}
                >
                  post@bmas.no
                </span>
                <span
                  className="text-[var(--color-text-secondary)]"
                  style={{ fontSize: 'var(--text-small)' }}
                >
                  Bergen, Norge
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 md:flex-row md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: smoothEase }}
        >
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3 md:items-baseline">
            <p className="font-[var(--font-mono)] text-[0.65rem] text-[var(--color-text-muted)]">
              {footer.copyright}
            </p>
            <span className="hidden text-[var(--color-text-muted)] opacity-20 md:inline" aria-hidden="true">|</span>
            <p className="font-[var(--font-mono)] text-[0.6rem] text-[var(--color-text-muted)]">
              Org.nr: 933 421 120
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-[var(--font-mono)] text-[0.6rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
              Personvern
            </span>
            <span className="text-[var(--color-text-muted)] opacity-20" aria-hidden="true">|</span>
            <span className="font-[var(--font-mono)] text-[0.6rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
              Vilkår
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
