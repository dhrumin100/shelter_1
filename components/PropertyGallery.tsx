"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setShowLightbox(true)
  }

  const closeLightbox = () => {
    setShowLightbox(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-80 w-full rounded-lg overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
          <Image src={images[0] || "/placeholder.svg"} alt="Property main image" fill className="object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative h-[150px] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Property image ${index + 2}`}
                fill
                className="object-cover"
              />
              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
