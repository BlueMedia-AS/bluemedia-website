import { useState, useEffect, useRef } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import Loader from './components/animation/Loader'
import AmbientBackground from './components/animation/AmbientBackground'
import CursorGlow from './components/animation/CursorGlow'
import Navbar from './components/layout/Navbar'
import Divider from './components/ui/Divider'
import Hero from './sections/Hero'
import Manifest from './sections/Manifest'
import Capabilities from './sections/Capabilities'
import Initiatives from './sections/Initiatives'
import About from './sections/About'
import Footer from './sections/Footer'
import RollingBall from './components/animation/RollingBall'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const reduced = useReducedMotion()
  const dotAnchorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), reduced ? 100 : 3200)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <MotionConfig reducedMotion="user">
      <Loader isLoading={isLoading} />
      <AmbientBackground />
      <CursorGlow />
      {!isLoading && <Navbar />}
      {!isLoading && <RollingBall anchorRef={dotAnchorRef} />}

      <main>
        <Hero isLoaded={!isLoading} dotAnchorRef={dotAnchorRef} />
        <Divider />
        <Manifest />
        <Divider />
        <Capabilities />
        <Divider />
        <Initiatives />
        <Divider />
        <About />
      </main>

      <Footer />
    </MotionConfig>
  )
}
