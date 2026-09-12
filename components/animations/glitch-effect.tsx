"use client"

import { useEffect, useState } from "react"

export function GlitchEffect() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {glitchActive && (
        <>
          <div className="absolute inset-0 bg-cyan-500/20 mix-blend-screen animate-glitch-1" />
          <div className="absolute inset-0 bg-magenta-500/20 mix-blend-screen animate-glitch-2" />
          <div className="absolute inset-0 bg-yellow-500/10 mix-blend-screen animate-glitch-3" />
        </>
      )}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan" />
      <style jsx>{`
        @keyframes glitch-1 {
          0%,
          100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-2px, 2px);
          }
          66% {
            transform: translate(2px, -2px);
          }
        }
        @keyframes glitch-2 {
          0%,
          100% {
            transform: translate(0);
          }
          33% {
            transform: translate(2px, -2px);
          }
          66% {
            transform: translate(-2px, 2px);
          }
        }
        @keyframes glitch-3 {
          0%,
          100% {
            transform: translate(0);
          }
          50% {
            transform: translate(-3px, 3px);
          }
        }
        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.2s infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.2s infinite;
        }
        .animate-glitch-3 {
          animation: glitch-3 0.2s infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
