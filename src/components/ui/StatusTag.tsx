import type { Initiative } from '../../types'
import { statusLabels } from '../../content/no'

const statusColors: Record<Initiative['status'], string> = {
  aktiv: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)]',
  utvikling: 'bg-amber-50 text-amber-700',
  konsept: 'bg-purple-50 text-purple-700',
  lansert: 'bg-emerald-50 text-emerald-700',
}

interface StatusTagProps {
  status: Initiative['status']
}

export default function StatusTag({ status }: StatusTagProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[var(--tracking-wide)] ${statusColors[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}
