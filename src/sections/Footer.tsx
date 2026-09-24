import Container from '../components/Container'
import { contact, footer } from '../content/no'

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-blue text-paper">
      <Container className="pb-10 pt-20 md:pt-28">
        <h2 className="text-2xl font-semibold tracking-[-0.015em]">{footer.title}</h2>
        <p className="mt-3 text-lg text-blue-soft">{footer.body}</p>

        <a
          href={`mailto:${contact.email}`}
          className="mt-10 inline-block break-words text-[clamp(2rem,7.5vw,6rem)] font-semibold leading-none tracking-[-0.04em] underline decoration-blue-soft/40 decoration-[0.06em] underline-offset-[0.12em] hover:decoration-paper"
        >
          {contact.email}
        </a>

        <div className="mt-24 flex flex-col gap-2 text-sm text-blue-soft sm:flex-row sm:gap-8 md:mt-32">
          <p>© {new Date().getFullYear()} BlueMedia AS</p>
          <p>{contact.city}</p>
        </div>
      </Container>
    </footer>
  )
}
