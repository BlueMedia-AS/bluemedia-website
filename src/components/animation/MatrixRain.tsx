import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

interface MatrixRainProps {
  /** Opacity of the entire canvas (0–1). */
  opacity?: number
  /** Base color for the characters. */
  color?: string
  /** Character size in px. */
  fontSize?: number
  /** Interval in ms between draw ticks. Higher = slower rain. */
  speed?: number
  /** How quickly trails fade. Lower = longer trails (0–1). Default 0.04. */
  fadeRate?: number
  /** Extra CSS class on the wrapper div. */
  className?: string
}

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' +
  '<>{}[]=/\\|@#$%^&*'

export default function MatrixRain({
  opacity = 1,
  color = '#1A1A1A',
  fontSize = 14,
  speed = 50,
  fadeRate = 0.04,
  className = '',
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let intervalId: ReturnType<typeof setInterval>

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const prev = ctx.getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      ctx.putImageData(prev, 0, 0)
    }

    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const columns = Math.max(1, Math.floor(canvas.width / fontSize))
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50),
    )

    const draw = () => {
      // Fade trail — low alpha = long tails
      ctx.fillStyle = `rgba(247, 246, 243, ${fadeRate})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'JetBrains Mono Variable', 'JetBrains Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head character — brighter
        ctx.fillStyle = hexToRgba(color, 0.6 + Math.random() * 0.4)
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    intervalId = setInterval(draw, speed)

    return () => {
      clearInterval(intervalId)
      ro.disconnect()
    }
  }, [reduced, color, fontSize, speed, fadeRate])

  if (reduced) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
