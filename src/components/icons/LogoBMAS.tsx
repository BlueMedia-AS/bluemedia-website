interface LogoProps {
  className?: string
  size?: number
}

export default function LogoBlueMedia({ className = '', size = 40 }: LogoProps) {
  return (
    <svg
      width={size * 3}
      height={size}
      viewBox="0 0 200 40"
      fill="none"
      className={className}
      aria-label="BlueMedia"
    >
      <text
        x="0"
        y="30"
        fontFamily="var(--font-primary)"
        fontWeight="700"
        fontSize="32"
        letterSpacing="0.08em"
        fill="currentColor"
      >
        BlueMedia
      </text>
    </svg>
  )
}
