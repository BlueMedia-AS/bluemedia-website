import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface LoaderProps {
  isLoading: boolean
}

const LINE_COUNT = 5
const CHAR_SET = 'アイウエオカキクケコ01{}[]<>/\\|BMAS'

function randomLine(len: number) {
  return Array.from({ length: len }, () =>
    CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)],
  ).join('')
}

export default function Loader({ isLoading }: LoaderProps) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background code lines */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-[0.06]" aria-hidden="true">
            {Array.from({ length: LINE_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className="block font-[var(--font-mono)] text-[0.65rem] tracking-[0.2em] text-[var(--color-text-primary)]"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduced ? 0.01 : 1.2,
                  delay: reduced ? 0 : 0.2 + i * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {randomLine(40)}
              </motion.span>
            ))}
          </div>

          {/* Expanding ring */}
          <motion.div
            className="absolute rounded-full border border-[var(--color-accent)]"
            initial={{ width: 0, height: 0, opacity: 0.4 }}
            animate={{
              width: [0, 200, 340],
              height: [0, 200, 340],
              opacity: [0.4, 0.15, 0],
              borderWidth: ['2px', '1px', '0.5px'],
            }}
            transition={{
              duration: reduced ? 0.01 : 3,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.5, 1],
            }}
            aria-hidden="true"
          />

          {/* Second ring */}
          <motion.div
            className="absolute rounded-full border border-[var(--color-accent-light)]"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: [0, 160, 280],
              height: [0, 160, 280],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: reduced ? 0.01 : 2.8,
              delay: reduced ? 0 : 0.4,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.5, 1],
            }}
            aria-hidden="true"
          />

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-accent-light) 50%, transparent 100%)' }}
            initial={{ top: '25%', opacity: 0 }}
            animate={{
              top: ['25%', '75%'],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: reduced ? 0.01 : 2.5,
              delay: reduced ? 0 : 0.3,
              ease: 'linear',
            }}
            aria-hidden="true"
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* Mono pre-label */}
            <motion.span
              className="mb-4 font-[var(--font-mono)] text-[0.6rem] uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{
                duration: reduced ? 0.01 : 1.2,
                delay: reduced ? 0 : 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Initialiserer
            </motion.span>

            {/* BMAS letters */}
            <div className="flex items-baseline gap-[0.04em]">
              {'BMAS'.split('').map((letter, i) => (
                <motion.span
                  key={letter}
                  className="inline-block font-[var(--font-primary)] font-bold text-[var(--color-accent)]"
                  style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1 }}
                  initial={{
                    opacity: 0,
                    y: 40,
                    rotateX: 90,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: reduced ? 0.01 : 0.9,
                    delay: reduced ? 0 : 0.6 + i * 0.18,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Underline wipe */}
            <motion.div
              className="mt-3 h-[2px] rounded-full"
              style={{ backgroundColor: 'var(--color-warm)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{
                duration: reduced ? 0.01 : 0.9,
                delay: reduced ? 0 : 1.6,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Dot pulse */}
            <motion.div
              className="mt-6 flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 2.0, duration: reduced ? 0.01 : 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
