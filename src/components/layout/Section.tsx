import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  as?: 'section' | 'header' | 'footer'
}

export default function Section({ id, children, className = '', as: Tag = 'section' }: SectionProps) {
  return (
    <Tag
      id={id}
      className={`relative py-[var(--section-padding-y)] ${className}`}
    >
      {children}
    </Tag>
  )
}
