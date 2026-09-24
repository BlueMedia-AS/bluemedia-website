import Container from '../components/Container'
import { hero } from '../content/no'

export default function Hero() {
  return (
    <header className="bg-blue text-paper">
      <Container className="flex min-h-[88svh] flex-col">
        <nav className="flex items-center justify-between py-6" aria-label="Hovednavigasjon">
          <a href="/" className="text-lg font-semibold tracking-[-0.02em]">
            BlueMedia
          </a>
          <a href="#kontakt" className="text-base underline-offset-4 hover:underline">
            Kontakt
          </a>
        </nav>

        <div className="mt-auto pb-16 pt-24 md:pb-24">
          <h1 className="text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            {hero.titleLines.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="fade-in mt-10 max-w-[36rem] text-lg leading-relaxed text-blue-soft md:text-xl">
            {hero.intro}
          </p>
        </div>
      </Container>
    </header>
  )
}
