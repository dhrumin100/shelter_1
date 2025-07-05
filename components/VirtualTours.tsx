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
    const message = `Hi, I'm interested in the ${tourTitle} for Adani Shantigram properties. Please provide more details.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
        Virtual Tours
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-gradient-white-soft rounded-2xl shadow-gray-soft overflow-hidden border border-gray-200 hover:shadow-orange-soft transition-all duration-300"
          >
            <div className="relative h-64 w-full">
              <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-white-soft rounded-full p-4 shadow-gray-soft border border-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="#ea580c" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2">{tour.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tour.description}</p>

              <button
                onClick={() => handleStartTour(tour.title)}
                className="w-full bg-gradient-orange-warm hover:bg-gradient-orange-dark text-white text-center font-semibold py-3 rounded-xl transition-all duration-300 shadow-orange-soft hover:shadow-orange-medium transform hover:scale-[1.02]"
              >
                Start Tour
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
