import type { Initiative, Capability, Principle } from '../types'

export const siteTitle = 'BMAS'
export const siteTagline = 'Innovasjon & Teknologi'

export const hero = {
  headline: 'Vi former fremtidens digitale landskap',
  subline:
    'BMAS bygger teknologi og strategier som transformerer industrier — med presisjon, visjon og kompromissløs kvalitet.',
  scrollLabel: 'Utforsk',
}

export const manifest = {
  label: '// Visjon',
  title: 'Vi tror på kraften i ideer som ennå ikke finnes',
  body: `I skjæringspunktet mellom teknologi og menneskelig innsikt skaper vi løsninger som ikke bare løser dagens problemer — men definerer morgendagens muligheter. Vår tilnærming er forankret i dyp forståelse, dristig tenkning og en urokkelig forpliktelse til kvalitet.`,
  hiddenText:
    'Det usynlige er like viktig som det synlige. Hvert piksel, hver linje kode, hver beslutning — alt henger sammen i et system designet for å vare.',
}

export const capabilities: { label: string; items: Capability[] } = {
  label: '// Områder',
  items: [
    {
      icon: 'strategy',
      title: 'Strategi & Rådgivning',
      description:
        'Dyptgående analyser og strategisk veiledning som gir virksomheter et varig konkurransefortrinn i det digitale landskapet.',
    },
    {
      icon: 'tech',
      title: 'Teknologiutvikling',
      description:
        'Skalerbar, robust programvare bygget med moderne arkitektur — fra skyinfrastruktur til intelligente systemer.',
    },
    {
      icon: 'design',
      title: 'Media Buying',
      description:
        'Strategisk mediekjøp og annonsering på tvers av kanaler — datadrevet, optimalisert og med maksimal avkastning.',
    },
    {
      icon: 'data',
      title: 'Data & Innsikt',
      description:
        'Fra rå data til handlingsbar innsikt. Vi bygger plattformer som gjør kompleksitet forståelig og beslutninger bedre.',
    },
    {
      icon: 'network',
      title: 'Nettverk & Partnerskap',
      description:
        'Et kuratert økosystem av teknologipartnere, investorer og innovatører som sammen skaper større verdi.',
    },
  ],
}

export const initiatives: { label: string; items: Initiative[] } = {
  label: '// Initiativer',
  items: [
    {
      id: 'aurora',
      title: 'Aurora Platform',
      description:
        'Neste generasjons skybasert analyseplattform for bedrifter som trenger sanntidsinnsikt i store datamengder.',
      status: 'utvikling',
      category: 'Teknologi',
    },
    {
      id: 'meridian',
      title: 'Meridian',
      description:
        'Et strategisk rammeverk for digital transformasjon — skreddersydd for nordiske virksomheter.',
      status: 'aktiv',
      category: 'Strategi',
    },
    {
      id: 'prism',
      title: 'Prism Design System',
      description:
        'Vårt eget designsystem som sikrer konsistent, tilgjengelig og vakker brukeropplevelse på tvers av alle prosjekter.',
      status: 'aktiv',
      category: 'Design',
    },
    {
      id: 'atlas',
      title: 'Atlas Insights',
      description:
        'AI-drevet markedsanalyse som avdekker mønstre og muligheter usynlige for det blotte øye.',
      status: 'konsept',
      category: 'Data',
    },
    {
      id: 'forge',
      title: 'Forge Accelerator',
      description:
        'Inkubatorprogram for lovende teknologiselskaper i tidlig fase med mentorskap og kapital.',
      status: 'aktiv',
      category: 'Nettverk',
    },
    {
      id: 'sentinel',
      title: 'Sentinel Security',
      description:
        'Proaktiv cybersikkerhetsplattform bygget på zero-trust-prinsipper for moderne skyinfrastruktur.',
      status: 'utvikling',
      category: 'Teknologi',
    },
  ],
}

export const about: {
  label: string
  title: string
  body: string
  principles: Principle[]
} = {
  label: '// Om BMAS',
  title: 'Bygget for å vare',
  body: `BMAS ble grunnlagt med en enkel overbevisning: at teknologi, riktig anvendt, kan løfte hele organisasjoner. Vi opererer i skjæringspunktet mellom nordisk pragmatisme og global ambisjon — alltid med kvalitet som ufravikelig standard.`,
  principles: [
    {
      title: 'Kvalitet over kvantitet',
      description: 'Færre prosjekter, dypere engasjement, varige resultater.',
    },
    {
      title: 'Langsiktig tenkning',
      description:
        'Vi bygger for tiår, ikke kvartaler. Bærekraftige løsninger krever tålmodighet.',
    },
    {
      title: 'Radikal åpenhet',
      description:
        'Transparent kommunikasjon med partnere, investorer og team — uten unntak.',
    },
  ],
}

export const footer = {
  copyright: `© ${new Date().getFullYear()} BMAS. Alle rettigheter reservert.`,
  tagline: 'Innovasjon med integritet.',
}

export const statusLabels: Record<Initiative['status'], string> = {
  aktiv: 'Aktiv',
  utvikling: 'Under utvikling',
  konsept: 'Konseptfase',
  lansert: 'Lansert',
}
