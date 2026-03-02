import { useState, useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'
import Loader from './components/animation/Loader'
import GrainOverlay from './components/animation/GrainOverlay'
import Navbar from './components/layout/Navbar'
import NodeNetwork from './components/animation/NodeNetwork'
import Manifest from './sections/Manifest'
import Footer from './sections/Footer'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const reduced = useReducedMotion()
  useSmoothScroll(!isLoading && !reduced)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), reduced ? 100 : 3200)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <MotionConfig reducedMotion="user">
      <Loader isLoading={isLoading} />
      <GrainOverlay isLoaded={!isLoading} />
      {!isLoading && <Navbar />}

      <div className="relative">
        {/* Ambient floating dots on sides — scrolls with content */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <NodeNetwork ambient className="opacity-70" />
        </div>

        <main className="relative z-10">
          <Manifest />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
