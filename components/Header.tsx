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
    // Scroll to properties section after tab change
    setTimeout(() => {
      scrollToSection("properties")
    }, 100)
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-40">
      <Link href="/" className="flex items-center">
        <Image
          src="/placeholder.svg?height=40&width=180"
          alt="Shantigram Logo"
          width={180}
          height={40}
          className="h-10 w-auto"
        />
        <div className="ml-2">
          <div className="text-xs text-orange-500 font-semibold">AUTHORISED CHANNEL</div>
          <div className="text-xs text-orange-500 font-semibold">PARTNER SHELTER4U</div>
        </div>
      </Link>

      <nav className="hidden md:flex items-center space-x-6">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Home
        </button>

        {/* Property Type Tabs */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTabClick("residential")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "residential" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:text-orange-500"
            }`}
          >
            🏠 Residential
          </button>
          <button
            onClick={() => handleTabClick("commercial")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === "commercial" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:text-orange-500"
            }`}
          >
            🏢 Commercial
          </button>
        </div>

        <button
          onClick={() => scrollToSection("virtual-tours")}
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Virtual Tours
        </button>
        <button
          onClick={() => scrollToSection("contact")}
          className="text-sm font-medium hover:text-orange-500 transition-colors"
        >
          Contact Us
        </button>
      </nav>

      <button className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  )
}
