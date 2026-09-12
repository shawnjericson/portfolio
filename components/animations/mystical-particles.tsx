"use client"

import { useEffect, useRef } from "react"

export function MysticalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class MysticalParticle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      angle: number
      angleSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 2
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.color = Math.random() > 0.5 ? "220, 38, 38" : "234, 179, 8"
        this.opacity = Math.random() * 0.4 + 0.2
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.02 - 0.01
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.angleSpeed

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)

        ctx.shadowBlur = 15
        ctx.shadowColor = `rgba(${this.color}, 0.8)`

        ctx.restore()
      }
    }

    const particles: MysticalParticle[] = []
    for (let i = 0; i < 30; i++) {
      particles.push(new MysticalParticle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
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
