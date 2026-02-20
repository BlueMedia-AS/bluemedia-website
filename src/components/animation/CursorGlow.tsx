import { motion, useReducedMotion } from 'framer-motion'
import { useCursorPosition } from '../../hooks/useCursorPosition'

export default function CursorGlow() {
  const { x, y } = useCursorPosition()
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: 400,
        height: 400,
        background:
          'radial-gradient(circle, rgba(74, 111, 165, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
      aria-hidden="true"
    />
  )
}
