import type { Principle } from '../types'

export const siteTitle = 'BlueMedia'
export const siteTagline = 'Innovasjon & Teknologi'

export const manifest = {
  label: '// Visjon',
  title: 'Systemutvikling for bedrift og forbruker',
  body: `BlueMedia utvikler programvareløsninger og digitale plattformer. Vi jobber med hele verdikjeden — fra teknisk arkitektur og produktdesign til drift, mediekjøp og vekststrategi.`,
  hiddenText:
    'Vår erfaring innenfor mediekjøp og vekststrategi fra tidligere prosjekter og kunder gjør oss i stand til å angripe etablerte markeder.',
}

export const about: {
  label: string
  title: string
  body: string
  principles: Principle[]
} = {
  label: '// Om BlueMedia',
  title: 'Om oss',
  body: `BlueMedia er et norsk teknologiselskap med base i Bergen. Vi utvikler programvare og digitale tjenester for kunder i ulike bransjer, og kombinerer teknisk gjennomføringskraft med kommersiell forståelse.`,
  principles: [
    {
      title: 'Leveransekraft',
      description: 'Vi måler oss på det vi faktisk leverer, ikke det vi lover.',
    },
    {
      title: 'Langsiktig perspektiv',
      description:
        'Vi bygger løsninger som skal vokse med kundene over tid, ikke bare dekke dagens behov.',
    },
    {
      title: 'Åpenhet',
      description:
        'Tydelig kommunikasjon om fremdrift, kostnader og prioriteringer gjennom hele prosjektet.',
    },
  ],
}

export const footer = {
  copyright: `© ${new Date().getFullYear()} BlueMedia. Alle rettigheter reservert.`,
  tagline: 'Teknologi som leverer.',
}
