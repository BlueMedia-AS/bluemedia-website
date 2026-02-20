export default function IconData({ className = '' }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <ellipse cx="16" cy="8" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8V16C6 18.2 10.5 20 16 20C21.5 20 26 18.2 26 16V8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 16V24C6 26.2 10.5 28 16 28C21.5 28 26 26.2 26 24V16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
