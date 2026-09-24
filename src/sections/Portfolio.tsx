import SectionRow from '../components/SectionRow'
import { portfolio } from '../content/no'

const { featured } = portfolio

export default function Portfolio() {
  return (
    <SectionRow id="kunder" title={portfolio.clientsTitle}>
      {/* Teorihuset — plain <a> without rel, so the link is followed */}
      <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-center lg:gap-12">
        <a href={featured.url} className="shrink-0" aria-label={featured.name}>
          <img src={featured.logo} alt={featured.name} width={270} height={80} className="h-auto w-[280px]" />
        </a>
        <p className="max-w-[32rem] text-lg leading-relaxed text-mist md:text-xl">
          <a
            href={featured.url}
            className="font-semibold text-ink underline decoration-blue decoration-2 underline-offset-4 hover:text-blue"
          >
            {featured.name}
          </a>{' '}
          – {featured.description}
        </p>
      </div>

      <ul className="grid text-lg sm:grid-cols-2 sm:gap-x-8 md:text-xl">
        {portfolio.clients.map((client) => (
          <li key={client} className="border-b border-rule py-3 first:border-t sm:[&:nth-child(2)]:border-t">
            {client}
          </li>
        ))}
      </ul>
    </SectionRow>
  )
}
