import { useReducedMotion } from 'framer-motion'

export default function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full opacity-60"
        style={{
          background: 'var(--color-blob-blue)',
          filter: 'blur(80px)',
          animation: reduced ? 'none' : 'blob-drift-1 25s ease-in-out infinite',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute -right-[5%] top-[30%] h-[500px] w-[500px] rounded-full opacity-50"
        style={{
          background: 'var(--color-blob-cream)',
          filter: 'blur(80px)',
          animation: reduced ? 'none' : 'blob-drift-2 30s ease-in-out infinite',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute bottom-[10%] left-[20%] h-[550px] w-[550px] rounded-full opacity-40"
        style={{
          background: 'var(--color-blob-lavender)',
          filter: 'blur(80px)',
          animation: reduced ? 'none' : 'blob-drift-3 35s ease-in-out infinite',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute top-[60%] right-[25%] h-[400px] w-[400px] rounded-full opacity-30"
        style={{
          background: 'var(--color-blob-blue)',
          filter: 'blur(100px)',
          animation: reduced ? 'none' : 'blob-drift-1 40s ease-in-out infinite reverse',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
