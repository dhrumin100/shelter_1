"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  activeTab?: "residential" | "commercial"
  onTabChange?: (tab: "residential" | "commercial") => void
}

export default function Header({ activeTab = "residential", onTabChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleTabClick = (tab: "residential" | "commercial") => {
    onTabChange?.(tab)
    setTimeout(() => {
      scrollToSection("properties")
    }, 100)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xs font-bold text-gray-600">Residential & Commercial Projects</span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col py-4">
              <button onClick={() => scrollToSection("hero")} className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium">Home</button>
              <button onClick={() => handleTabClick("residential")} className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium">Residential</button>
              <button onClick={() => handleTabClick("commercial")} className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium">Commercial</button>
              <button onClick={() => scrollToSection("contact")} className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium">Contact</button>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block w-full sticky top-10 z-50" style={{ background: 'transparent' }}>
        <div className="w-full px-4">
          {/* ↓↓↓ Reduced max width to keep navbar shorter */}
          <div className="max-w-[950px] mx-auto flex items-center justify-between bg-orange-50 rounded-full shadow-md px-6 py-2" style={{ minHeight: '60px' }}>

            {/* Logo + Label */}
            <div className="flex items-center">
              <Image src="/images/logo.png" alt="Logo" width={44} height={44} />
              <span className="ml-2 text-black font-bold text-sm md:text-base bg-orange-50 px-3 py-1 rounded-full shadow-sm">
                Residential & Commercial Projects
              </span>
            </div>

            {/* Nav */}
            <nav className="flex space-x-5 text-base font-medium">
              <button onClick={() => scrollToSection("hero")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Home</button>
              <button onClick={() => handleTabClick("residential")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Residential</button>
              <button onClick={() => handleTabClick("commercial")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Commercial</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Contact</button>
            </nav>
          </div>
        </div>
      </div>

      <div className="h-2 md:h-3" />
    </div>
  )
}
