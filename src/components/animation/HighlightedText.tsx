import { motion, useReducedMotion } from 'framer-motion'

/**
 * Text with an animated highlight background that sweeps in word-by-word.
 * The highlight has soft, slightly irregular edges using an SVG filter.
 */

const smoothEase = [0.45, 0, 0.15, 1] as const

interface HighlightedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  /** Delay before the animation starts */
  delay?: number
  /** Color of the highlight */
  color?: string
}

export default function HighlightedText({
  text,
  className = '',
  style,
  delay = 0,
  color = '#e8edf4',
}: HighlightedTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  return (
    <>
      {/* SVG filter for organic/rough edges on the highlight */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="highlight-rough">
            {/* Turbulence creates organic noise */}
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            {/* Displace the shape edges using the noise */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <span className={`inline ${className}`} style={style}>
        {words.map((word, i) => (
          <span key={i} className="relative inline-block">
            {/* Animated highlight background */}
            <motion.span
              className="absolute inset-0 block"
              style={{
                background: color,
                borderRadius: '3px',
                margin: '-2px -4px',
                padding: '2px 4px',
                filter: 'url(#highlight-rough)',
                zIndex: 0,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={
                reduced
                  ? { duration: 0.01 }
                  : {
                      duration: 1.2,
                      delay: delay + i * 0.2,
                      ease: smoothEase,
                    }
              }
              aria-hidden="true"
            />
            {/* The actual word text sits above */}
            <span className="relative z-[1]">{word}</span>
            {/* Space after each word except last */}
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    </>
  )
}
