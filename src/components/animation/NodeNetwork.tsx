import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  pulsePhase: number
  pulseSpeed: number
  opacity: number
  /** 0 = normal, 1 = accent hub */
  type: number
}

interface DataPacket {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
  opacity: number
}

const NODE_COUNT = 45
const CONNECTION_DISTANCE = 180
const PACKET_CHANCE = 0.003
const ACCENT = { r: 44, g: 62, b: 107 }   // --color-accent #2C3E6B
const MUTED = { r: 138, g: 138, b: 134 }   // --color-text-muted #8A8A86

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function NodeNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animId = 0
    let nodes: Node[] = []
    let packets: DataPacket[] = []

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initNodes() {
      nodes = []
      for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = i < 5
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: isHub ? 2.5 + Math.random() * 1.5 : 1 + Math.random() * 1.5,
          baseRadius: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.5,
          opacity: isHub ? 0.5 + Math.random() * 0.3 : 0.15 + Math.random() * 0.25,
          type: isHub ? 1 : 0,
        })
        nodes[i].baseRadius = nodes[i].radius
      }
    }

    function spawnPacket() {
      // Find two connected nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE && Math.random() < PACKET_CHANCE) {
            packets.push({
              fromIdx: i,
              toIdx: j,
              progress: 0,
              speed: 0.008 + Math.random() * 0.012,
              opacity: 0.6 + Math.random() * 0.4,
            })
            if (packets.length > 15) packets.shift()
          }
        }
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h)

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        // Soft bounce off edges with padding
        if (node.x < -20) node.vx = Math.abs(node.vx)
        if (node.x > w + 20) node.vx = -Math.abs(node.vx)
        if (node.y < -20) node.vy = Math.abs(node.vy)
        if (node.y > h + 20) node.vy = -Math.abs(node.vy)

        // Gentle pulse
        node.radius = node.baseRadius + Math.sin(time * 0.001 * node.pulseSpeed + node.pulsePhase) * 0.5
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const strength = 1 - dist / CONNECTION_DISTANCE
            const isAccent = nodes[i].type === 1 || nodes[j].type === 1
            const c = isAccent ? ACCENT : MUTED
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(${c.r},${c.g},${c.b},${strength * (isAccent ? 0.18 : 0.08)})`
            ctx!.lineWidth = isAccent ? 0.8 : 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw and update data packets
      spawnPacket()
      packets = packets.filter((p) => p.progress <= 1)
      for (const packet of packets) {
        packet.progress += packet.speed
        const from = nodes[packet.fromIdx]
        const to = nodes[packet.toIdx]
        const px = lerp(from.x, to.x, packet.progress)
        const py = lerp(from.y, to.y, packet.progress)
        const fadeIn = Math.min(packet.progress * 5, 1)
        const fadeOut = Math.min((1 - packet.progress) * 5, 1)
        const alpha = packet.opacity * fadeIn * fadeOut

        // Glow
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, 6)
        grad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha * 0.5})`)
        grad.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`)
        ctx!.beginPath()
        ctx!.arc(px, py, 6, 0, Math.PI * 2)
        ctx!.fillStyle = grad
        ctx!.fill()

        // Core dot
        ctx!.beginPath()
        ctx!.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`
        ctx!.fill()
      }

      // Draw nodes
      for (const node of nodes) {
        const c = node.type === 1 ? ACCENT : MUTED

        // Outer glow for hub nodes
        if (node.type === 1) {
          const glow = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5)
          glow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${node.opacity * 0.2})`)
          glow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
          ctx!.beginPath()
          ctx!.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2)
          ctx!.fillStyle = glow
          ctx!.fill()
        }

        // Node dot
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${node.opacity})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initNodes()

    if (reduced) {
      // Static render — one frame only
      draw(0)
    } else {
      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  )
}
