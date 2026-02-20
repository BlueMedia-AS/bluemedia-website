export default function IconNetwork({ className = '' }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 11V16L8 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16L24 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
