export default function IconDesign({ className = '' }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 26V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 16H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
