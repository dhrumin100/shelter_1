"use client"

import Image from "next/image"
import { useState } from "react"
import UniversalForm from "./forms/UniversalForm"
import Marquee from 'react-fast-marquee'

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
  const [modalOpen, setModalOpen] = useState<null | 'booking' | 'rent'>(null);

  const handleScrollToProperties = () => {
    const element = document.getElementById("properties")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] w-full overflow-hidden pt-24 md:pt-28"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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

      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 xl:gap-28 items-center justify-between min-h-[85vh] py-6 md:py-10">

            {/* LEFT: Heading & Button */}
            <div className="lg:col-span-6 xl:col-span-5 text-white order-1 lg:order-1 flex flex-col justify-start">
              <div className="max-w-3xl">
                <div className="mb-4 md:mb-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up">
                    Discover your dream property in Gift City Gujarat
                  </h1>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-cream-100/90 mb-6 md:mb-8 leading-relaxed max-w-2xl font-light">
                  {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-4 md:mb-6">
                  <button
                    onClick={handleScrollToProperties}
                    className="group bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:shadow-orange-medium text-white font-bold px-8 md:px-10 py-4 md:py-5 rounded-xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-orange-soft w-full sm:w-auto"
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
                </div>

                {/* Marquee - Desktop Only */}
                <div className="w-full mb-8 md:mb-10 hidden lg:block">
                  <Marquee gradient={false} speed={40} pauseOnHover={true} className="flex items-center">
                    {[
                      '/images/bank-of-usa.png',
                      '/images/kpmg.png',
                      '/images/deloitte.png',
                      '/images/tcs.png',
                      '/images/googgle.jpg',
                      '/images/oracl.jpg',
                      '/images/cnnara.png',
                      '/images/hdfc.png',
                      '/images/ibm.png',
                    ].map((src, idx) => (
                      <div key={idx} className="w-20 h-20 rounded-full bg-orange-solid flex items-center justify-center shadow-md border-2 border-orange-200 overflow-hidden mx-4">
                        <img src={src} alt="Company Logo" className="max-w-[70%] max-h-[70%] object-contain" style={{ display: 'block', margin: 'auto' }} />
                      </div>
                    ))}
                  </Marquee>
                </div>

              </div>
            </div>

            {/* RIGHT: Desktop Form */}
            <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 order-2 items-center justify-center relative min-h-[600px]">
              <div className="w-[470px] h-[600px] bg-orange-solid border-2 border-orange-200 shadow-2xl rounded-3xl flex flex-col items-center justify-center p-8 overflow-visible mr-[-32px] xl:mr-[-64px]">
                <UniversalForm type="booking" className="compact square" title="Book a Site Visit Form" description="Fill out the form below to schedule your visit. Our team will contact you soon!" />
              </div>
            </div>

            {/* MOBILE: Form & Marquee Only */}
            <div className="block lg:hidden w-full mt-8 order-last">
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Mobile Form */}
                <div className="w-full max-w-[370px] min-h-[520px] bg-orange-solid border-2 border-orange-200 shadow-2xl rounded-3xl flex flex-col items-center justify-center p-4 overflow-visible mx-auto mb-2">
                  <UniversalForm type="booking" className="compact square" title="Book a Site Visit Form" description="Fill out the form below to schedule your visit. Our team will contact you soon!" />
                </div>

                {/* Mobile Marquee */}
                <div className="w-full mb-4">
                  <Marquee gradient={false} speed={40} pauseOnHover={true} className="flex items-center">
                    {[
                      '/images/bank-of-usa.png',
                      '/images/kpmg.png',
                      '/images/deloitte.png',
                      '/images/tcs.png',
                      '/images/googgle.jpg',
                      '/images/oracl.jpg',
                      '/images/cnnara.png',
                      '/images/hdfc.png',
                      '/images/ibm.png',
                    ].map((src, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-full bg-orange-solid flex items-center justify-center shadow-md border-2 border-orange-200 overflow-hidden mx-2">
                        <img src={src} alt="Company Logo" className="max-w-[70%] max-h-[70%] object-contain" style={{ display: 'block', margin: 'auto' }} />
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
