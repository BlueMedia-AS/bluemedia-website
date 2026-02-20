import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * A small filled dot that starts as the period at the end of the hero
 * headline, then detaches and rolls loosely through every section
 * down to the footer as the user scrolls.
 *
 * Uses a simple spring simulation so it lags, overshoots, and settles
 * — like a marble rolling on a surface.
 */

const BALL_SIZE = 12
const TRAIL_LENGTH = 12
const TRAIL_SPACING = 3 // only record every Nth frame

interface Waypoint {
  sectionId: string
  xPercent: number
  yOffset: number
}

const waypoints: Waypoint[] = [
  { sectionId: 'visjon', xPercent: 10, yOffset: 50 },
  { sectionId: 'omrader', xPercent: 82, yOffset: 70 },
  { sectionId: 'initiativer', xPercent: 18, yOffset: 55 },
  { sectionId: 'om', xPercent: 75, yOffset: 50 },
]

interface Vec2 {
  x: number
  y: number
}

export default function RollingBall({ anchorRef }: { anchorRef: React.RefObject<HTMLSpanElement | null> }) {
  const reduced = useReducedMotion()
  const ballRef = useRef<HTMLDivElement>(null)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const [visible, setVisible] = useState(false)

  // Spring state — persisted across frames
  const spring = useRef({
    currentX: 0,
    currentY: 0,
    velocityX: 0,
    velocityY: 0,
    targetX: 0,
    targetY: 0,
    rotation: 0,
    prevX: 0,
  })

  // Trail: array of recent screen positions
  const trail = useRef<{ x: number; y: number }[]>([])
  const frameCount = useRef(0)

  const resolvedPoints = useRef<Vec2[]>([])
  const anchorPos = useRef<Vec2>({ x: 0, y: 0 })

  const resolvePoints = useCallback(() => {
    const pts: Vec2[] = []

    // First waypoint is the anchor (period position)
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      anchorPos.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
      }
      pts.push({ ...anchorPos.current })
    }

    for (const wp of waypoints) {
      const el = document.getElementById(wp.sectionId)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      pts.push({
        x: rect.left + (rect.width * wp.xPercent) / 100,
        y: rect.top + window.scrollY + wp.yOffset,
      })
    }

    resolvedPoints.current = pts
  }, [anchorRef])

  useEffect(() => {
    if (reduced) return

    const SPRING_STIFFNESS = 0.006
    const SPRING_DAMPING = 0.92

    function getTarget(scrollY: number): Vec2 {
      const pts = resolvedPoints.current
      if (pts.length < 2) return pts[0] || { x: 0, y: 0 }

      const viewCenter = scrollY + window.innerHeight * 0.5
      const firstY = pts[0].y
      const lastY = pts[pts.length - 1].y
      const range = lastY - firstY

      if (range <= 0) return pts[0]

      const rawT = (viewCenter - firstY) / range
      const t = Math.max(0, Math.min(1, rawT))

      // Find segment
      let segIdx = 0
      for (let i = 1; i < pts.length; i++) {
        const segT = (pts[i].y - firstY) / range
        if (t < segT) break
        segIdx = i - 1
      }
      segIdx = Math.min(segIdx, pts.length - 2)

      const segStartT = (pts[segIdx].y - firstY) / range
      const segEndT = (pts[segIdx + 1].y - firstY) / range
      const segRange = segEndT - segStartT
      const localT = segRange > 0 ? Math.max(0, Math.min(1, (t - segStartT) / segRange)) : 0

      return {
        x: pts[segIdx].x + (pts[segIdx + 1].x - pts[segIdx].x) * localT,
        y: pts[segIdx].y + (pts[segIdx + 1].y - pts[segIdx].y) * localT,
      }
    }

    function update(_time: number) {
      if (!ballRef.current) {
        rafRef.current = requestAnimationFrame(update)
        return
      }

      const pts = resolvedPoints.current
      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(update)
        return
      }

      const scrollY = window.scrollY
      const entryStart = pts[0].y - window.innerHeight * 0.4

      if (scrollY < entryStart) {
        if (visible) setVisible(false)
        rafRef.current = requestAnimationFrame(update)
        return
      }
      if (!visible) {
        setVisible(true)
        // Initialize spring at anchor
        spring.current.currentX = pts[0].x
        spring.current.currentY = pts[0].y
        spring.current.prevX = pts[0].x
      }

      const target = getTarget(scrollY)
      const s = spring.current

      // Spring physics
      const dx = target.x - s.currentX
      const dy = target.y - s.currentY

      s.velocityX += dx * SPRING_STIFFNESS
      s.velocityY += dy * SPRING_STIFFNESS

      s.velocityX *= SPRING_DAMPING
      s.velocityY *= SPRING_DAMPING

      s.currentX += s.velocityX
      s.currentY += s.velocityY

      // Rolling rotation based on horizontal movement
      const movedX = s.currentX - s.prevX
      const circumference = Math.PI * BALL_SIZE
      s.rotation += (movedX / circumference) * 360
      s.prevX = s.currentX

      const screenX = s.currentX
      const screenY = s.currentY - scrollY

      ballRef.current.style.transform =
        `translate(${screenX - BALL_SIZE / 2}px, ${screenY - BALL_SIZE / 2}px) rotate(${s.rotation}deg)`

      // Record trail positions (every Nth frame to space them out)
      frameCount.current++
      if (frameCount.current % TRAIL_SPACING === 0) {
        trail.current.push({ x: screenX, y: screenY })
        if (trail.current.length > TRAIL_LENGTH) trail.current.shift()
      }

      // Draw trail on canvas
      const tc = trailCanvasRef.current
      if (tc) {
        const tctx = tc.getContext('2d')
        if (tctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          if (tc.width !== window.innerWidth * dpr || tc.height !== window.innerHeight * dpr) {
            tc.width = window.innerWidth * dpr
            tc.height = window.innerHeight * dpr
            tc.style.width = window.innerWidth + 'px'
            tc.style.height = window.innerHeight + 'px'
            tctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          }
          tctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

          const len = trail.current.length
          for (let i = 0; i < len; i++) {
            const t = trail.current[i]
            const age = (i + 1) / len // 0→1, newest = 1
            const alpha = age * 0.25
            const size = BALL_SIZE * 0.3 * age

            tctx.beginPath()
            tctx.arc(t.x, t.y, size, 0, Math.PI * 2)
            tctx.fillStyle = `rgba(44, 62, 107, ${alpha})`
            tctx.fill()
          }
        }
      }

      rafRef.current = requestAnimationFrame(update)
    }

    // Init after layout
    const initTimer = setTimeout(() => {
      resolvePoints()
      // Initialize spring at anchor
      const pts = resolvedPoints.current
      if (pts.length > 0) {
        spring.current.currentX = pts[0].x
        spring.current.currentY = pts[0].y
        spring.current.prevX = pts[0].x
      }
      rafRef.current = requestAnimationFrame(update)
    }, 300)

    const onResize = () => resolvePoints()
    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced, visible, resolvePoints])

  if (reduced) return null

  return (
    <>
      {/* Trail canvas — full viewport behind the ball */}
      <canvas
        ref={trailCanvasRef}
        className="pointer-events-none fixed inset-0 z-[49]"
        aria-hidden="true"
        style={{ display: visible ? 'block' : 'none' }}
      />

      {/* The ball itself */}
      <motion.div
        ref={ballRef}
        className="pointer-events-none fixed left-0 top-0 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, ease: [0.45, 0, 0.15, 1] }}
        aria-hidden="true"
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: -8,
            width: BALL_SIZE + 16,
            height: BALL_SIZE + 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(44,62,107,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Core ball */}
        <div
          style={{
            position: 'relative',
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px rgba(44, 62, 107, 0.35), 0 0 4px rgba(44, 62, 107, 0.2), 0 1px 3px rgba(0, 0, 0, 0.15)',
          }}
        />
      </motion.div>
    </>
  )
}
