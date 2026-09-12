"use client"

import { useEffect, useRef } from "react"

export function CulturalPatterns() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class Pattern {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 30 + 20
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = Math.random() * 0.01 - 0.005
        this.opacity = Math.random() * 0.2 + 0.1
      }

      update() {
        this.rotation += this.rotationSpeed
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.strokeStyle = `rgba(16, 185, 129, ${this.opacity})`
        ctx.lineWidth = 2

        for (let i = 0; i < 8; i++) {
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(this.size, 0)
          ctx.stroke()
          ctx.rotate(Math.PI / 4)
        }

        ctx.restore()
      }
    }

    const patterns: Pattern[] = []
    for (let i = 0; i < 15; i++) {
      patterns.push(new Pattern())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      patterns.forEach((pattern) => {
        pattern.update()
        pattern.draw()
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-10" />
}
