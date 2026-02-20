import Section from '../components/layout/Section'
import Container from '../components/layout/Container'
import Reveal from '../components/animation/Reveal'
import MonoLabel from '../components/ui/MonoLabel'
import HighlightedText from '../components/animation/HighlightedText'
import HiddenTextReveal from '../components/animation/HiddenTextReveal'
import { manifest } from '../content/no'

export default function Manifest() {
  return (
    <Section id="visjon">
      <Container>
        <Reveal variant="fadeUp">
          <MonoLabel>{manifest.label}</MonoLabel>
        </Reveal>

        <Reveal variant="scaleIn" delay={0.2}>
          <h2
            className="mt-6 max-w-3xl font-bold leading-[var(--leading-snug)] tracking-[var(--tracking-tight)]"
            style={{ fontSize: 'var(--text-h1)' }}
          >
            <HighlightedText text={manifest.title} delay={0.3} />
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.4}>
          <p
            className="mt-8 max-w-2xl text-[var(--color-text-secondary)]"
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {manifest.body}
          </p>
        </Reveal>

        <div className="mt-12">
          <HiddenTextReveal
            text={manifest.hiddenText}
            className="max-w-xl text-[var(--text-small)]"
          />
        </div>
      </Container>
    </Section>
  )
}
