import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import CircuitTraces from '../components/animation/CircuitTraces'
import TerminalText from '../components/animation/TerminalText'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import { LogoBMAS } from '../components/icons'
import { hero } from '../content/no'

interface HeroProps {
  isLoaded: boolean
  dotAnchorRef?: React.Ref<HTMLSpanElement>
}

const ease = [0.25, 0.1, 0.25, 1] as const
const smoothEase = [0.45, 0, 0.15, 1] as const

export default function Hero({ isLoaded, dotAnchorRef }: HeroProps) {
  const reduced = useReducedMotion()
  const fast = !!reduced
  const [typingDone, setTypingDone] = useState(false)

  return (
    <Section as="header" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <CircuitTraces />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Logo — gentle scale + blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
          transition={{ duration: fast ? 0.01 : 1.2, delay: fast ? 0 : 0.2, ease: smoothEase }}
          className="mb-8"
        >
          <LogoBMAS size={48} className="text-[var(--color-accent)]" />
        </motion.div>

        {/* Headline — terminal typewriter, 85ms per char */}
        <TerminalText
          text={hero.headline}
          as="h1"
          active={isLoaded}
          startDelay={600}
          charSpeed={85}
          onComplete={() => setTypingDone(true)}
          className="max-w-4xl font-bold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]"
          style={{ fontSize: 'var(--text-display)' }}
          dotAnchorRef={dotAnchorRef}
        />

        {/* Subline — gentle fade after typing */}
        <motion.p
          className="mt-6 max-w-2xl text-[var(--color-text-secondary)]"
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)' }}
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={typingDone || fast ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={{ duration: fast ? 0.01 : 1.2, delay: fast ? 0 : 0.4, ease: smoothEase }}
        >
          {hero.subline}
        </motion.p>

        {/* Decorative rings */}
        <motion.div
          className="mt-12"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={typingDone || fast ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: fast ? 0.01 : 1.6, delay: fast ? 0 : 0.8, ease: smoothEase }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <motion.circle
              cx="60" cy="60" r="50"
              stroke="var(--color-accent-light)"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={typingDone || fast ? { pathLength: 1, opacity: 0.3 } : undefined}
              transition={{ duration: fast ? 0.01 : 2, delay: fast ? 0 : 1.0, ease: 'linear' }}
            />
            <motion.circle
              cx="60" cy="60" r="30"
              stroke="var(--color-warm)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={typingDone || fast ? { pathLength: 1, opacity: 0.3 } : undefined}
              transition={{ duration: fast ? 0.01 : 1.8, delay: fast ? 0 : 1.4, ease: 'linear' }}
            />
            <motion.circle
              cx="60" cy="60" r="3"
              fill="var(--color-accent)"
              initial={{ scale: 0, opacity: 0 }}
              animate={typingDone || fast ? { scale: 1, opacity: 0.4 } : undefined}
              transition={{ duration: fast ? 0.01 : 0.6, delay: fast ? 0 : 1.8, ease }}
            />
          </svg>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={typingDone || fast ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: fast ? 0.01 : 1, delay: fast ? 0 : 2.2, ease: smoothEase }}
        >
          <ScrollIndicator label={hero.scrollLabel} />
        </motion.div>
      </Container>
    </Section>
  )
}
