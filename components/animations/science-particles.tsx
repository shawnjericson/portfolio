"use client"

import { useEffect, useRef } from "react"

export function ScienceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class Atom {
      x: number
      y: number
      radius: number
      electrons: { angle: number; distance: number; speed: number }[]

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = 3
        this.electrons = []

        for (let i = 0; i < 3; i++) {
          this.electrons.push({
            angle: (Math.PI * 2 * i) / 3,
            distance: 15 + i * 5,
            speed: 0.02 + i * 0.01,
          })
        }
      }

      update() {
        this.electrons.forEach((electron) => {
          electron.angle += electron.speed
        })
      }

      draw() {
        if (!ctx) return

        ctx.fillStyle = "rgba(100, 116, 139, 0.4)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        this.electrons.forEach((electron) => {
          const ex = this.x + Math.cos(electron.angle) * electron.distance
          const ey = this.y + Math.sin(electron.angle) * electron.distance

          ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
          ctx.beginPath()
          ctx.arc(this.x, this.y, electron.distance, 0, Math.PI * 2)
          ctx.stroke()

          ctx.fillStyle = "rgba(148, 163, 184, 0.6)"
          ctx.beginPath()
          ctx.arc(ex, ey, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      }
    }

    const atoms: Atom[] = []
    for (let i = 0; i < 8; i++) {
      atoms.push(new Atom())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      atoms.forEach((atom) => {
        atom.update()
        atom.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70 z-10" />
}
