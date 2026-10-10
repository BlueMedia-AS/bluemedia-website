import SectionRow from '../components/SectionRow'
import { partner } from '../content/no'

export default function Partner() {
  return (
    <SectionRow id="samarbeid" title={partner.title}>
      {/* The logo is white-only, so it sits on an ink plate */}
      <a href={partner.url} className="block bg-ink px-8 py-12 md:px-12 md:py-16" aria-label={partner.name}>
        <img src={partner.logo} alt={partner.name} width={512} height={54} className="h-auto w-full max-w-[360px]" />
      </a>
      <p className="mt-8 max-w-[36rem] text-lg leading-relaxed md:text-xl">{partner.body}</p>
    </SectionRow>
  )
}
