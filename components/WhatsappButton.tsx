"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsappButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = "9714512452"
    const message = "Hi, I'm interested in Adani Shantigram properties."

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={24} />
      {isHovered && (
        <span className="absolute right-full mr-3 whitespace-nowrap bg-gradient-white-soft text-gray-800 px-3 py-2 rounded-lg text-sm font-medium shadow-gray-soft border border-gray-200">
          Chat with us
        </span>
      )}
    </button>
  )
}
