import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import GlassPanel from '../components/layout/GlassPanel'
import Reveal from '../components/animation/Reveal'
import MonoLabel from '../components/ui/MonoLabel'
import StatusTag from '../components/ui/StatusTag'
import { initiatives } from '../content/no'

const allCategories = ['Alle', ...new Set(initiatives.items.map((i) => i.category))]

export default function Initiatives() {
  const [activeFilter, setActiveFilter] = useState('Alle')

  const filtered =
    activeFilter === 'Alle'
      ? initiatives.items
      : initiatives.items.filter((i) => i.category === activeFilter)

  return (
    <Section id="initiativer">
      <Container>
        <Reveal variant="fadeUp">
          <MonoLabel>{initiatives.label}</MonoLabel>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer initiativer">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-4 py-1.5 font-[var(--font-mono)] text-[0.75rem] uppercase tracking-[var(--tracking-wide)] transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-subtle)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((initiative, i) => (
              <motion.div
                key={initiative.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <GlassPanel className="flex h-full flex-col">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3
                      className="font-semibold text-[var(--color-text-primary)]"
                      style={{ fontSize: 'var(--text-h3)' }}
                    >
                      {initiative.title}
                    </h3>
                    <StatusTag status={initiative.status} />
                  </div>
                  <p
                    className="text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-small)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {initiative.description}
                  </p>
                  <span className="mt-4 inline-block font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-muted)]">
                    {initiative.category}
                  </span>
                </GlassPanel>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
