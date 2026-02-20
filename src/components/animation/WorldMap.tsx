import { motion, useReducedMotion } from 'framer-motion'

/**
 * Ping locations in approximate SVG coordinates (viewBox 0 0 1000 500).
 * Mercator-ish: x = longitude mapped to 0–1000, y = latitude mapped to 0–500.
 */
const pings = [
  { x: 493, y: 148, label: 'Bergen', delay: 0 },
  { x: 510, y: 155, label: 'Stockholm', delay: 1.5 },
  { x: 478, y: 170, label: 'London', delay: 3.2 },
  { x: 505, y: 180, label: 'Berlin', delay: 0.8 },
  { x: 250, y: 195, label: 'New York', delay: 2.4 },
  { x: 195, y: 215, label: 'Miami', delay: 4.0 },
  { x: 540, y: 200, label: 'Dubai', delay: 1.8 },
  { x: 720, y: 235, label: 'Singapore', delay: 3.5 },
  { x: 780, y: 310, label: 'Sydney', delay: 2.0 },
  { x: 640, y: 195, label: 'Mumbai', delay: 4.5 },
  { x: 165, y: 175, label: 'Toronto', delay: 2.8 },
  { x: 100, y: 210, label: 'San Francisco', delay: 1.2 },
  { x: 760, y: 195, label: 'Tokyo', delay: 3.8 },
  { x: 510, y: 290, label: 'Nairobi', delay: 5.0 },
  { x: 330, y: 320, label: 'São Paulo', delay: 4.2 },
]

export default function WorldMap({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 500"
        fill="none"
        className="h-auto w-full"
      >
        {/* Simplified world map outlines — continents as paths */}
        <g stroke="var(--color-text-muted)" strokeWidth="0.8" fill="none" opacity="0.25">
          {/* North America */}
          <path d="M60,120 Q80,100 120,95 Q160,90 180,100 Q200,85 230,80 Q260,85 270,100 Q280,115 270,130 Q280,140 260,155 Q270,170 260,185 Q250,200 240,210 Q230,225 210,230 Q190,225 170,215 Q155,210 140,200 Q130,190 120,175 Q110,160 90,155 Q75,150 65,140 Q55,130 60,120Z" />
          {/* South America */}
          <path d="M260,250 Q270,240 285,245 Q300,250 320,265 Q335,280 340,300 Q345,320 340,340 Q335,360 320,375 Q305,385 290,380 Q280,370 275,350 Q265,330 260,310 Q255,290 255,270 Q255,260 260,250Z" />
          {/* Europe */}
          <path d="M465,110 Q475,100 490,95 Q505,100 515,110 Q525,105 535,110 Q540,120 535,130 Q530,140 520,150 Q510,160 500,165 Q490,170 480,165 Q470,160 465,150 Q460,140 458,130 Q460,120 465,110Z" />
          {/* Africa */}
          <path d="M480,195 Q490,185 505,190 Q520,195 535,205 Q545,220 550,240 Q555,260 550,280 Q545,300 535,315 Q525,330 510,340 Q495,345 485,335 Q475,320 470,300 Q465,280 465,260 Q465,240 470,220 Q475,205 480,195Z" />
          {/* Asia */}
          <path d="M545,80 Q570,70 600,75 Q630,70 660,80 Q690,85 720,90 Q750,95 770,105 Q785,115 780,130 Q775,145 760,155 Q745,165 720,170 Q700,175 680,180 Q660,185 640,185 Q620,180 600,175 Q580,170 565,160 Q550,150 540,140 Q535,130 538,120 Q540,100 545,80Z" />
          {/* Oceania */}
          <path d="M740,280 Q760,270 785,275 Q810,280 825,295 Q835,310 825,325 Q815,335 795,335 Q775,330 760,320 Q748,310 742,295 Q738,285 740,280Z" />
          {/* Greenland */}
          <path d="M320,55 Q340,45 360,50 Q375,55 380,70 Q378,80 365,85 Q350,88 335,82 Q322,75 320,65 Q318,58 320,55Z" />
        </g>

        {/* Dot grid overlay for texture */}
        <g opacity="0.06">
          {Array.from({ length: 20 }).map((_, row) =>
            Array.from({ length: 40 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 25 + 12}
                cy={row * 25 + 12}
                r="0.6"
                fill="var(--color-text-muted)"
              />
            )),
          )}
        </g>

        {/* Ping points */}
        {pings.map((ping) => (
          <g key={ping.label}>
            {/* Expanding ring pulse */}
            {!reduced && (
              <motion.circle
                cx={ping.x}
                cy={ping.y}
                r="4"
                fill="none"
                stroke="var(--color-accent-light)"
                strokeWidth="0.7"
                initial={{ r: 4, opacity: 0.6 }}
                animate={{
                  r: [4, 18],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: ping.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeOut',
                }}
              />
            )}
            {/* Second ring — offset */}
            {!reduced && (
              <motion.circle
                cx={ping.x}
                cy={ping.y}
                r="4"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                initial={{ r: 4, opacity: 0.4 }}
                animate={{
                  r: [4, 13],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  delay: ping.delay + 0.4,
                  repeat: Infinity,
                  repeatDelay: 3.4,
                  ease: 'easeOut',
                }}
              />
            )}
            {/* Center dot */}
            <motion.circle
              cx={ping.x}
              cy={ping.y}
              r="2.5"
              fill="var(--color-accent)"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                reduced
                  ? { opacity: 0.6, scale: 1 }
                  : {
                      opacity: [0, 0.8, 0.6],
                      scale: [0, 1.3, 1],
                    }
              }
              transition={{
                duration: reduced ? 0.01 : 0.6,
                delay: reduced ? 0 : ping.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
