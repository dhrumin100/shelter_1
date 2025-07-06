"use client"

import Image from "next/image"
import UniversalForm from "./forms/UniversalForm"

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  buttonText?: string
  buttonLink?: string
}

export default function Hero({
  title,
  subtitle = "Discover premium residential projects with world-class amenities and modern architecture. Your dream home awaits in the heart of Ahmedabad.",
  backgroundImage = "/images/main.jpg",
  buttonText = "Explore Now",
  buttonLink = "#properties",
}: HeroProps) {
  const handleScrollToProperties = () => {
    const element = document.getElementById("properties")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-16 md:pt-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero background for Gift City Gujarat real estate projects"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements with Premium Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-orange-200/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cream-100/30 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 xl:gap-32 items-center justify-between min-h-screen py-8 md:py-12">
            {/* Left Content - Hero Text */}
            <div className="lg:col-span-6 xl:col-span-5 text-white order-1 lg:order-1 flex flex-col justify-center">
              <div className="max-w-3xl">
                {/* Main Heading with Premium Gradient */}
                <div className="mb-6 md:mb-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up">
                    Discover your dream property in Gift City Gujarat
                  </h1>
                </div>

                {/* Subtitle with Premium Typography */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream-100/90 mb-6 md:mb-8 lg:mb-10 leading-relaxed max-w-2xl font-light">
                  {subtitle}
                </p>

                {/* Enhanced CTA Section with Premium Gradients */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 md:mb-12">
                  <button
                    onClick={handleScrollToProperties}
                    className="group bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:shadow-orange-medium text-white font-bold px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-2xl text-lg md:text-xl lg:text-2xl transition-all duration-300 transform hover:scale-110 shadow-orange-soft w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <span className="flex items-center justify-center">
                      {buttonText}
                      <svg
                        className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Trust Indicator with Premium Styling */}
                  <div className="flex items-center justify-center sm:justify-start text-cream-100/80">
                    <div className="flex items-center bg-gradient-to-r from-orange-500/20 to-orange-400/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 border border-orange-300/20">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 md:mr-3 animate-pulse"></div>
                      <span className="text-xs md:text-sm font-medium">RERA Approved Projects</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Key Features with Premium Colors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm">
                  {[
                    { icon: "🏆", text: "Premium Amenities", gradient: "from-orange-400/20 to-orange-300/20" },
                    { icon: "🏗️", text: "Modern Architecture", gradient: "from-orange-300/20 to-orange-200/20" },
                    { icon: "📍", text: "Prime Location", gradient: "from-orange-500/20 to-orange-400/20" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center bg-gradient-to-r ${feature.gradient} backdrop-blur-sm rounded-lg px-3 md:px-4 py-2 md:py-3 hover:bg-gradient-to-r hover:from-orange-400/30 hover:to-orange-300/30 transition-all duration-300 border border-orange-200/20`}
                    >
                      <span className="text-xl md:text-2xl mr-2 md:mr-3">{feature.icon}</span>
                      <span className="font-medium text-xs md:text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Premium Booking Form */}
            <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-2 flex justify-center lg:justify-end items-center">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="bg-white/90 rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 lg:p-10 border border-orange-100 hover:shadow-orange-soft transition-shadow duration-500 mt-2 md:mt-12">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
                      Book Your Site Visit
                    </h3>
                    <p className="text-orange-600/80 text-sm md:text-base">Schedule a personalized tour today</p>
                  </div>
                  <UniversalForm type="booking" title="" description="" className="space-y-4 md:space-y-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient with Premium Colors */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-cream-50/30 to-transparent pointer-events-none"></div>

      {/* Mobile divider */}
      <div className="block md:hidden my-8 border-t-2 border-orange-100 w-full" />
    </section>
  )
}
