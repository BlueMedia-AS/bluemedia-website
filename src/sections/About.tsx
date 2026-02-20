import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import GlassPanel from '../components/layout/GlassPanel'
import Reveal from '../components/animation/Reveal'
import MonoLabel from '../components/ui/MonoLabel'
import { about } from '../content/no'

export default function About() {
  return (
    <Section id="om">
      <Container>
        <Reveal variant="fadeUp">
          <MonoLabel>{about.label}</MonoLabel>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.2}>
          <h2
            className="mt-6 max-w-2xl font-bold leading-[var(--leading-snug)] tracking-[var(--tracking-tight)]"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {about.title}
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.3}>
          <p
            className="mt-6 max-w-2xl text-[var(--color-text-secondary)]"
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {about.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {about.principles.map((principle, i) => (
            <Reveal key={principle.title} variant="fadeUp" delay={0.4 + i * 0.1}>
              <GlassPanel hover={false} className="h-full">
                <h3
                  className="mb-2 font-semibold text-[var(--color-accent)]"
                  style={{ fontSize: 'var(--text-h3)' }}
                >
                  {principle.title}
                </h3>
                <p
                  className="text-[var(--color-text-secondary)]"
                  style={{
                    fontSize: 'var(--text-small)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {principle.description}
                </p>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
