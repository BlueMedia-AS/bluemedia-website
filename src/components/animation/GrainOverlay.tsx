import { useEffect, useRef, useState, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface GrainOverlayProps {
  isLoaded: boolean
}

export default function GrainOverlay({ isLoaded }: GrainOverlayProps) {
  const reduced = useReducedMotion()
  const [introPhase, setIntroPhase] = useState<'waiting' | 'burst' | 'settled'>('waiting')
  const svgRef = useRef<SVGSVGElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const scrollRef = useRef(0)
  const heroHeightRef = useRef(0)
  const seedRef = useRef(0)

  useEffect(() => {
    function onScroll() {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    heroHeightRef.current = window.innerHeight
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    setIntroPhase('burst')
    const timer = setTimeout(() => setIntroPhase('settled'), 1400)
    return () => clearTimeout(timer)
  }, [isLoaded])

  const getTargetOpacity = useCallback(() => {
    if (introPhase === 'waiting') return 0
    if (introPhase === 'burst') return 0.4

    const scroll = scrollRef.current
    const heroH = heroHeightRef.current || window.innerHeight

    if (scroll < heroH * 0.3) return 0.18

    const scrollProgress = Math.min((scroll - heroH * 0.3) / (heroH * 3), 1)
    return 0.18 + scrollProgress * 0.14
  }, [introPhase])

  useEffect(() => {
    if (reduced) return

    let animId = 0
    let currentOpacity = 0
    let lastSeedChange = 0

    function tick(time: number) {
      const targetOpacity = getTargetOpacity()
      currentOpacity += (targetOpacity - currentOpacity) * 0.06

      if (time - lastSeedChange > 100) {
        lastSeedChange = time
        seedRef.current = (seedRef.current + 1) % 200
        turbulenceRef.current?.setAttribute('seed', String(seedRef.current))
      }

      if (svgRef.current) {
        svgRef.current.style.opacity = String(currentOpacity)
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [reduced, getTargetOpacity])

  if (reduced) return null

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-[55] h-full w-full"
      aria-hidden="true"
      style={{ opacity: 0, mixBlendMode: 'soft-light' }}
    >
      <filter id="grain">
        <feTurbulence
          ref={turbulenceRef}
          type="fractalNoise"
          baseFrequency="0.55"
          numOctaves="4"
          stitchTiles="stitch"
          seed="0"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}
