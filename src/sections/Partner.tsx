import SectionRow from '../components/SectionRow'
import { partner } from '../content/no'

export default function Partner() {
  return (
    <SectionRow id="samarbeid" title={partner.title} divider={false} blue>
      <a href={partner.url} className="inline-block" aria-label={partner.name}>
        <img src={partner.logo} alt={partner.name} width={512} height={54} className="h-auto w-full max-w-[360px]" />
      </a>
      <p className="mt-10 max-w-[36rem] text-lg leading-relaxed text-blue-soft md:text-xl">{partner.body}</p>
    </SectionRow>
  )
}
