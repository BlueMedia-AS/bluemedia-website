import type { ReactNode } from 'react'
import Container from './Container'

interface SectionRowProps {
  id?: string
  title: string
  /** Rule above the row; off for rows that sit right under a blue band */
  divider?: boolean
  /** Blue band in the hero/footer colour instead of white */
  blue?: boolean
  children: ReactNode
}

/** Title in the left column, content in the right — the one layout every section row shares. */
export default function SectionRow({ id, title, divider = true, blue = false, children }: SectionRowProps) {
  return (
    <section id={id} className={`scroll-mt-8 ${blue ? 'bg-blue text-paper' : ''}`}>
      <Container>
        <div className={`grid gap-6 py-16 ${divider ? 'border-t border-rule' : ''} md:grid-cols-12 md:gap-8 md:py-24`}>
          <h2 className="text-2xl font-semibold tracking-[-0.015em] md:col-span-4">{title}</h2>
          <div className="md:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  )
}
