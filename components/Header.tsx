"use client"

import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  activeTab?: "residential" | "commercial"
  onTabChange?: (tab: "residential" | "commercial") => void
}

export default function Header({ activeTab = "residential", onTabChange }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleTabClick = (tab: "residential" | "commercial") => {
    onTabChange?.(tab)
    setTimeout(() => {
      scrollToSection("properties")
    }, 100)
  }

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center px-8 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-md bg-white/20 gap-6 min-w-0 flex-wrap">

        {/* Logo + Badge (left) */}
        <div className="flex items-center gap-3 min-w-[250px] flex-grow">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          <span className="text-sm sm:text-base md:text-lg font-semibold text-orange-700 pl-2 whitespace-nowrap">
            AUTHORISED CHANNEL PARTNER SHELTER4U
          </span>
        </div>

        {/* Nav (center) */}
        <nav className="flex-1 flex justify-center space-x-6 sm:space-x-10 text-sm sm:text-base md:text-lg font-medium min-w-0">
          <button onClick={() => scrollToSection("hero")} className="hover:text-orange-600 transition">Home</button>
          <button onClick={() => handleTabClick("residential")} className="hover:text-orange-600 transition">Residential</button>
          <button onClick={() => handleTabClick("commercial")} className="hover:text-orange-600 transition">Commercial</button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-orange-600 transition">Contact</button>
        </nav>

        {/* Empty right block for symmetry */}
        <div className="w-8 min-w-0 flex-grow" />
      </div>
    </div>
  )
}
