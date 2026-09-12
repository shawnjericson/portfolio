"use client"

import { useEffect, useRef } from "react"

export function ChocolateDrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class Drip {
      x: number
      y: number
      length: number
      speed: number
      width: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -20
        this.length = Math.random() * 20 + 10
        this.speed = Math.random() * 1 + 0.5
        this.width = Math.random() * 3 + 2
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = -20
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length)
        gradient.addColorStop(0, "rgba(120, 60, 30, 0.8)")
        gradient.addColorStop(0.5, "rgba(90, 45, 20, 0.6)")
        gradient.addColorStop(1, "rgba(60, 30, 15, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(this.x, this.y, this.width, this.length)
      }
    }

    const drips: Drip[] = []
    for (let i = 0; i < 15; i++) {
      drips.push(new Drip())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drips.forEach((drip) => {
        drip.update()
        drip.draw()
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-10" />
}
