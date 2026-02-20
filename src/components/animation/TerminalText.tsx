import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface TerminalTextProps {
  text: string
  /** Delay before typing starts (ms). */
  startDelay?: number
  /** Time per character (ms). */
  charSpeed?: number
  /** Whether to start the animation. */
  active?: boolean
  /** Called when typing finishes. */
  onComplete?: () => void
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** Ref attached to an invisible anchor span at the end of the text — used by RollingBall */
  dotAnchorRef?: React.Ref<HTMLSpanElement>
}

export default function TerminalText({
  text,
  startDelay = 0,
  charSpeed = 85,
  active = true,
  onComplete,
  className = '',
  style,
  as: Tag = 'h1',
  dotAnchorRef,
}: TerminalTextProps) {
  const reduced = useReducedMotion()
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Start delay
  useEffect(() => {
    if (!active || reduced) return
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [active, startDelay, reduced])

  // Typing
  useEffect(() => {
    if (!started || reduced) return
    if (displayed.length >= text.length) {
      setDone(true)
      onCompleteRef.current?.()
      return
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, charSpeed)
    return () => clearTimeout(timer)
  }, [started, displayed, text, charSpeed, reduced])

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {/* Prompt character — fades in gently before typing starts */}
        <motion.span
          className="inline-block font-[var(--font-mono)] text-[var(--color-text-muted)]"
          style={{ fontSize: '0.6em', verticalAlign: 'baseline', marginRight: '0.3em' }}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.4 } : undefined}
          transition={{ duration: 0.8, delay: Math.max(0, startDelay / 1000 - 0.4), ease: [0.45, 0, 0.15, 1] }}
        >
          &gt;
        </motion.span>

        {/* Typed text */}
        {displayed}

        {/* Invisible anchor for the rolling ball dot position */}
        {done && <span ref={dotAnchorRef} className="inline-block" style={{ width: 0, height: 0 }} />}

        {/* Blinking cursor while typing */}
        {!done && started && (
          <motion.span
            className="inline-block font-[var(--font-mono)] text-[var(--color-accent)]"
            style={{ fontSize: '1em', marginLeft: '2px' }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.55, 1] }}
          >
            |
          </motion.span>
        )}

        {/* Cursor holds then slowly fades after done */}
        {done && (
          <motion.span
            className="inline-block font-[var(--font-mono)] text-[var(--color-accent)]"
            style={{ fontSize: '1em', marginLeft: '2px' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.45, 0, 0.15, 1] }}
          >
            |
          </motion.span>
        )}
      </span>
    </Tag>
  )
}
