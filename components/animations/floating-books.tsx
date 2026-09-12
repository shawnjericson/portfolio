"use client"

import { useEffect, useRef } from "react"

export function FloatingBooks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class Book {
      x: number
      y: number
      width: number
      height: number
      speedY: number
      opacity: number
      rotation: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.width = 20
        this.height = 25
        this.speedY = -(Math.random() * 0.5 + 0.3)
        this.opacity = Math.random() * 0.3 + 0.2
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = Math.random() * 0.02 - 0.01
      }

      update() {
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        if (this.y < -this.height) {
          this.y = canvas.height + this.height
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        ctx.fillStyle = `rgba(14, 165, 233, ${this.opacity})`
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)

        ctx.strokeStyle = `rgba(14, 165, 233, ${this.opacity + 0.2})`
        ctx.lineWidth = 2
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height)

        ctx.restore()
      }
    }

    const books: Book[] = []
    for (let i = 0; i < 20; i++) {
      books.push(new Book())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      books.forEach((book) => {
        book.update()
        book.draw()
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-65 z-10" />
}
