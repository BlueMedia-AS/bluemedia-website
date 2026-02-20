import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Circuit-board-style traces that draw from edges/corners inward,
 * then stay alive with periodic energy pulses flowing along the paths.
 */

interface Segment {
  x1: number
  y1: number
  x2: number
  y2: number
  progress: number
  speed: number
  opacity: number
  width: number
  branched: boolean
  depth: number
  angle: number
  hasNode: boolean
  /** Length of this segment in px */
  length: number
}

interface Pulse {
  segIdx: number
  progress: number
  speed: number
  opacity: number
}

const MAX_DEPTH = 6
const BRANCH_CHANCE = 0.5
const ACCENT = { r: 44, g: 62, b: 107 }
const MUTED = { r: 138, g: 138, b: 134 }

function snapAngle(_base: number): number {
  const steps = [0, Math.PI / 2, Math.PI, -Math.PI / 2]
  const chosen = steps[Math.floor(Math.random() * steps.length)]
  return chosen + (Math.random() - 0.5) * 0.15
}

function createSegment(
  x: number,
  y: number,
  angle: number,
  depth: number,
  delayFrames: number,
): Segment {
  const len = 40 + Math.random() * 100
  return {
    x1: x,
    y1: y,
    x2: x + Math.cos(angle) * len,
    y2: y + Math.sin(angle) * len,
    progress: -delayFrames * 0.005,
    speed: 0.006 + Math.random() * 0.006,
    opacity: Math.max(0.15, 0.55 - depth * 0.07),
    width: Math.max(0.4, 1.6 - depth * 0.2),
    branched: false,
    depth,
    angle,
    hasNode: Math.random() < 0.45,
    length: len,
  }
}

export default function CircuitTraces({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animId = 0
    let segments: Segment[] = []
    let pulses: Pulse[] = []
    let allDrawn = false
    let lastPulseSpawn = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initTraces() {
      segments = []
      pulses = []
      allDrawn = false
      lastPulseSpawn = 0

      const origins: { x: number; y: number; angle: number }[] = []

      // Left edge
      for (let i = 0; i < 5; i++) {
        origins.push({
          x: Math.random() * w * 0.12,
          y: h * 0.1 + Math.random() * h * 0.8,
          angle: (Math.random() - 0.5) * 0.6,
        })
      }

      // Right edge
      for (let i = 0; i < 5; i++) {
        origins.push({
          x: w - Math.random() * w * 0.12,
          y: h * 0.1 + Math.random() * h * 0.8,
          angle: Math.PI + (Math.random() - 0.5) * 0.6,
        })
      }

      // Corners
      origins.push({ x: w * 0.05, y: h * 0.05, angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3 })
      origins.push({ x: w * 0.95, y: h * 0.05, angle: (Math.PI * 3) / 4 + (Math.random() - 0.5) * 0.3 })
      origins.push({ x: w * 0.05, y: h * 0.95, angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.3 })
      origins.push({ x: w * 0.95, y: h * 0.95, angle: (-Math.PI * 3) / 4 + (Math.random() - 0.5) * 0.3 })

      // Top/bottom edges
      for (let i = 0; i < 3; i++) {
        origins.push({
          x: w * 0.15 + Math.random() * w * 0.7,
          y: Math.random() * h * 0.08,
          angle: Math.PI / 2 + (Math.random() - 0.5) * 0.4,
        })
        origins.push({
          x: w * 0.15 + Math.random() * w * 0.7,
          y: h - Math.random() * h * 0.08,
          angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.4,
        })
      }

      origins.forEach((o, i) => {
        segments.push(createSegment(o.x, o.y, o.angle, 0, i * 5))
      })
    }

    function tryBranch(seg: Segment) {
      if (seg.branched || seg.depth >= MAX_DEPTH) return
      seg.branched = true

      if (Math.random() < 0.7) {
        segments.push(
          createSegment(seg.x2, seg.y2, snapAngle(seg.angle), seg.depth + 1, 0),
        )
      }

      if (Math.random() < BRANCH_CHANCE) {
        const branchAngle = seg.angle + (Math.random() < 0.5 ? 1 : -1) * (Math.PI / 2 + (Math.random() - 0.5) * 0.3)
        segments.push(
          createSegment(seg.x2, seg.y2, branchAngle, seg.depth + 1, 3),
        )
      }
    }

    function spawnPulses(time: number) {
      // Every ~2 seconds, spawn a few pulses on random completed segments
      if (time - lastPulseSpawn < 2000) return
      lastPulseSpawn = time

      const completed = segments
        .map((s, i) => ({ s, i }))
        .filter((o) => o.s.progress >= 1)
      if (completed.length === 0) return

      const count = 2 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const pick = completed[Math.floor(Math.random() * completed.length)]
        pulses.push({
          segIdx: pick.i,
          progress: 0,
          speed: 0.008 + Math.random() * 0.01,
          opacity: 0.5 + Math.random() * 0.5,
        })
      }

      // Cap pulse count
      if (pulses.length > 25) pulses.splice(0, pulses.length - 25)
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h)

      let stillDrawing = false

      // Update & draw segments
      for (const seg of segments) {
        if (seg.progress < 1) {
          seg.progress += seg.speed
          if (seg.progress < 1) stillDrawing = true
        }

        if (seg.progress <= 0) continue

        const t = Math.min(seg.progress, 1)
        const ex = seg.x1 + (seg.x2 - seg.x1) * t
        const ey = seg.y1 + (seg.y2 - seg.y1) * t
        const c = seg.depth < 2 ? ACCENT : MUTED

        // Trace line
        ctx!.beginPath()
        ctx!.moveTo(seg.x1, seg.y1)
        ctx!.lineTo(ex, ey)
        ctx!.strokeStyle = `rgba(${c.r},${c.g},${c.b},${seg.opacity})`
        ctx!.lineWidth = seg.width
        ctx!.lineCap = 'round'
        ctx!.stroke()

        // Drawing tip glow
        if (t < 1) {
          const grad = ctx!.createRadialGradient(ex, ey, 0, ex, ey, 12)
          grad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${0.5})`)
          grad.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`)
          ctx!.beginPath()
          ctx!.arc(ex, ey, 12, 0, Math.PI * 2)
          ctx!.fillStyle = grad
          ctx!.fill()
        }

        // Node dots — breathing glow
        if (t >= 1 && seg.hasNode) {
          const breathe = 0.6 + Math.sin(time * 0.002 + seg.x2 + seg.y2) * 0.3
          const nodeR = seg.width + 1.5

          // Outer glow
          const glow = ctx!.createRadialGradient(seg.x2, seg.y2, 0, seg.x2, seg.y2, nodeR * 4)
          glow.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${breathe * 0.2})`)
          glow.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`)
          ctx!.beginPath()
          ctx!.arc(seg.x2, seg.y2, nodeR * 4, 0, Math.PI * 2)
          ctx!.fillStyle = glow
          ctx!.fill()

          // Core dot
          ctx!.beginPath()
          ctx!.arc(seg.x2, seg.y2, nodeR, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${seg.opacity * breathe})`
          ctx!.fill()
        }

        // Origin dots
        if (seg.depth === 0 && t > 0) {
          ctx!.beginPath()
          ctx!.arc(seg.x1, seg.y1, 2.5, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.4)`
          ctx!.fill()
        }

        if (t >= 1) tryBranch(seg)
      }

      if (!stillDrawing && !allDrawn) allDrawn = true

      // Spawn and draw energy pulses after initial drawing is done
      if (allDrawn) spawnPulses(time)

      pulses = pulses.filter((p) => p.progress <= 1)
      for (const pulse of pulses) {
        pulse.progress += pulse.speed
        const seg = segments[pulse.segIdx]
        if (!seg) continue

        const px = seg.x1 + (seg.x2 - seg.x1) * pulse.progress
        const py = seg.y1 + (seg.y2 - seg.y1) * pulse.progress
        const fadeIn = Math.min(pulse.progress * 4, 1)
        const fadeOut = Math.min((1 - pulse.progress) * 4, 1)
        const alpha = pulse.opacity * fadeIn * fadeOut

        // Pulse glow
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, 10)
        grad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha * 0.6})`)
        grad.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`)
        ctx!.beginPath()
        ctx!.arc(px, py, 10, 0, Math.PI * 2)
        ctx!.fillStyle = grad
        ctx!.fill()

        // Pulse core
        ctx!.beginPath()
        ctx!.arc(px, py, 2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`
        ctx!.fill()
      }

      // Always keep animating — pulses + breathing nodes keep it alive
      animId = requestAnimationFrame(draw)
    }

    resize()
    initTraces()

    if (reduced) {
      for (let round = 0; round <= MAX_DEPTH; round++) {
        for (const seg of segments) {
          seg.progress = 2
          tryBranch(seg)
        }
      }
      draw(0)
    } else {
      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      resize()
      initTraces()
      if (reduced) {
        for (let round = 0; round <= MAX_DEPTH; round++) {
          for (const seg of segments) {
            seg.progress = 2
            tryBranch(seg)
          }
        }
        draw(0)
      }
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  )
}
