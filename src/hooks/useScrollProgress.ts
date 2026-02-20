import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useScrollProgress(): {
  ref: React.RefObject<HTMLDivElement | null>
  progress: MotionValue<number>
  opacity: MotionValue<number>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60])

  return { ref, progress: scrollYProgress, opacity, y }
}
