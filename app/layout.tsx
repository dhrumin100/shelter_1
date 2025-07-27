import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import WhatsappButton from "@/components/WhatsappButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gift City Gujarat - Residential & Commercial Properties",
  description:
    "Explore premium residential and commercial projects in Gift City Gujarat, Ahmedabad. From luxury apartments to modern office spaces.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <main>{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  )
}
