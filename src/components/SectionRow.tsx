import type { ReactNode } from 'react'
import Container from './Container'

interface SectionRowProps {
  id?: string
  title: string
  /** Rule above the row; off for the first row, which sits right under the hero */
  divider?: boolean
  children: ReactNode
}

/** Title in the left column, content in the right — the one layout every white section shares. */
export default function SectionRow({ id, title, divider = true, children }: SectionRowProps) {
  return (
    <section id={id} className="scroll-mt-8">
      <Container>
        <div className={`grid gap-6 py-16 ${divider ? 'border-t border-rule' : ''} md:grid-cols-12 md:gap-8 md:py-24`}>
          <h2 className="text-2xl font-semibold tracking-[-0.015em] md:col-span-4">{title}</h2>
          <div className="md:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  )
}
