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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10841451989"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10841451989');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <main>{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  )
}
