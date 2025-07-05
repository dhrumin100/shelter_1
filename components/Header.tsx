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
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
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
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-sm font-semibold text-orange-700">
              SHELTER4U
            </span>
          </div>

          {/* Hamburger Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
            <nav className="flex flex-col py-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleTabClick("residential")}
                className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium"
              >
                Residential
              </button>
              <button
                onClick={() => handleTabClick("commercial")}
                className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium"
              >
                Commercial
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-3 text-left text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block w-full bg-transparent">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-2 md:pt-4">
          <div className="flex items-center px-6 lg:px-8 py-3 rounded-full shadow-lg border border-white/20 backdrop-blur-md bg-white/20 gap-4 lg:gap-6 min-w-0 flex-wrap">

            {/* Logo + Badge (left) */}
            <div className="flex items-center gap-3 min-w-[200px] lg:min-w-[250px] flex-grow">
              <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
              <span className="text-sm lg:text-base xl:text-lg font-semibold text-orange-700 pl-2 whitespace-nowrap">
                AUTHORISED CHANNEL PARTNER SHELTER4U
              </span>
            </div>

            {/* Nav (center) */}
            <nav className="flex-1 flex justify-center space-x-4 lg:space-x-6 xl:space-x-10 text-sm lg:text-base xl:text-lg font-medium min-w-0">
              <button onClick={() => scrollToSection("hero")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Home</button>
              <button onClick={() => handleTabClick("residential")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Residential</button>
              <button onClick={() => handleTabClick("commercial")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Commercial</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition-colors px-2 py-1 rounded">Contact</button>
            </nav>

            {/* Empty right block for symmetry */}
            <div className="w-8 min-w-0 flex-grow" />
          </div>
        </div>
      </div>
      {/* Add a minimal gap below the navbar for all screens */}
      <div className="h-2 md:h-3" />
    </div>
  )
}
