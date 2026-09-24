import SectionRow from '../components/SectionRow'
import { about } from '../content/no'

export default function About() {
  return (
    <SectionRow id="om" title={about.title} divider={false}>
      <div className="max-w-[40rem] space-y-6 text-lg leading-relaxed md:text-xl">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </SectionRow>
  )
}
