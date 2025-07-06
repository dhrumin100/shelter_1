"use client"

import Image from "next/image"

export default function VirtualTours() {
  const tours = [
    {
      id: 1,
      title: "Interior 3D Tour",
      image: "/images/toor.jpg",
      description: "Explore interior designs in an immersive experience",
    },
    {
      id: 2,
      title: "Virtual Sample House",
      image: "/images/smaple.jpg",
      description: "Take a virtual tour of our sample houses",
    },
  ]

  const handleStartTour = (tourTitle: string) => {
    const phoneNumber = "9714512452"
    const message = `Hi, I'm interested in the ${tourTitle} for Gift City Gujarat properties. Please provide more details.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }
}