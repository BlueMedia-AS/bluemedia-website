import Hero from './sections/Hero'
import About from './sections/About'
import Portfolio from './sections/Portfolio'
import Partner from './sections/Partner'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Partner />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
