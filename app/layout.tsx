import type React from "react"
import type { Metadata } from "next"
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import "./portfolio.css"

const bvp = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-bvp",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Đặng Lê Tuấn Anh",
  description:
    "Fullstack developer building operations software for manufacturing, hospitality, healthcare and real estate. Nine systems, four running in production.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bvp.variable} ${mono.variable}`}>{children}</body>
    </html>
  )
}
