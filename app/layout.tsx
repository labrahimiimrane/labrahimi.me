import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Navigation from "@/components/navigation"

export const metadata: Metadata = {
  title: "Labrahimi Imrane | Full-Stack Web Developer",
  description:
    "Explore the portfolio of Labrahimi Imrane, a full-stack web developer in Casablanca, Morocco, with 6+ years of experience building websites with WordPress, React, and Next.js.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={GeistSans.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}