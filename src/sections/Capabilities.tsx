import { motion } from 'framer-motion'
import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import GlassPanel from '../components/layout/GlassPanel'
import Reveal from '../components/animation/Reveal'
import MonoLabel from '../components/ui/MonoLabel'
import {
  IconStrategy,
  IconTech,
  IconDesign,
  IconData,
  IconNetwork,
} from '../components/icons'
import { capabilities } from '../content/no'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  strategy: IconStrategy,
  tech: IconTech,
  design: IconDesign,
  data: IconData,
  network: IconNetwork,
}

export default function Capabilities() {
  return (
    <Section id="omrader">
      <Container>
        <Reveal variant="fadeUp">
          <MonoLabel>{capabilities.label}</MonoLabel>
        </Reveal>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {capabilities.items.map((cap) => {
            const Icon = iconMap[cap.icon]
            return (
              <motion.div
                key={cap.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <GlassPanel className="flex h-full flex-col">
                  {Icon && (
                    <motion.div
                      className="mb-4 text-[var(--color-accent)]"
                      whileHover={{ scale: 1.1, color: 'var(--color-accent-light)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon />
                    </motion.div>
                  )}
                  <h3
                    className="mb-3 font-semibold text-[var(--color-text-primary)]"
                    style={{ fontSize: 'var(--text-h3)' }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-small)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {cap.description}
                  </p>
                </GlassPanel>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
