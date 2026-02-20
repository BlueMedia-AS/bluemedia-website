export default function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`} aria-hidden="true">
      <svg width="120" height="2" viewBox="0 0 120 2" fill="none">
        <line
          x1="0"
          y1="1"
          x2="120"
          y2="1"
          stroke="var(--color-text-muted)"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  )
}
