import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  wide?: boolean
  className?: string
}

export default function Container({ children, wide, className = '' }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-[var(--section-padding-x)] ${className}`}
      style={{ maxWidth: wide ? 'var(--container-wide)' : 'var(--container-max)' }}
    >
      {children}
    </div>
  )
}
