import SectionRow from '../components/SectionRow'
import { partner } from '../content/no'

export default function Partner() {
  return (
    <SectionRow id="samarbeid" title={partner.title}>
      {/* The logo is white-only, so it sits on a blue blob */}
      <a
        href={partner.url}
        className="relative grid aspect-[600/280] w-full max-w-[460px] place-items-center"
        aria-label={partner.name}
      >
        <svg viewBox="0 0 600 280" className="absolute inset-0 h-full w-full fill-blue" aria-hidden="true">
          <path d="M92 40C170-8 330 6 440 18C540 30 604 92 592 160C580 230 500 272 380 270C270 268 200 282 120 256C40 230-6 170 6 110C14 72 50 66 92 40Z" />
        </svg>
        <img src={partner.logo} alt="" width={512} height={54} className="relative h-auto w-[64%]" />
      </a>
      <p className="mt-10 max-w-[36rem] text-lg leading-relaxed md:text-xl">{partner.body}</p>
    </SectionRow>
  )
}
