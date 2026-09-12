import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dang Le Tuan Anh - Full-Stack Developer Portfolio",
  description:
    "Portfolio of Dang Le Tuan Anh, a Full-Stack Developer specializing in React, Next.js, Node.js, and Laravel.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
