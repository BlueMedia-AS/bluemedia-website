import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  className = '',
  style,
  delay = 0,
  as: Tag = 'h1',
}: AnimatedTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Tag className={className} style={style}>{text}</Tag>
  }

  return (
    <Tag className={className} style={style} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ staggerChildren: 0.08, delayChildren: delay }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
