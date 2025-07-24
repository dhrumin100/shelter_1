"use client"

import { useState, memo } from "react"
import Image from "next/image"
import type { Property } from "@/lib/types"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import LoadingSpinner from "./ui/LoadingSpinner"
import EnquiryModal from "./modals/EnquiryModal"
import PropertyDetailsModal from "./modals/PropertyDetailsModal"
import { Square, Calendar, MapPin, Car, Building2, User, Briefcase } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

const PropertyCard = memo(function PropertyCard({ property }: PropertyCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const { sendPropertyEnquiry } = useWhatsApp()

  const handleEnquireClick = () => {
    setShowEnquiryModal(true)
  }

  const handleKnowMoreClick = () => {
    setShowDetailsModal(true)
  }

  const handleCloseEnquiryModal = () => {
    setShowEnquiryModal(false)
  }

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  const isCommercial = property.category === "commercial"

  const getPropertyTypeText = () => {
    if (isCommercial) {
      return property.type
    }
    return property.type === "Villa"
      ? property.name === "West Park"
        ? "Build To Suit Villas"
        : `${property.bhk} BHK Villas`
      : `${property.bhk} BHK`
  }

  // Utility to append 'Sqft' only if not present
  const appendSqft = (value: string) => {
    if (!value) return '';
    return /sq\.? ?ft/i.test(value) ? value : `${value} Sqft`;
  };

  const formatSizeDisplay = () => {
    if (isCommercial) {
      return appendSqft(property.size);
    }
    if (property.type === "Villa") {
      return `${property.size} sq. yard${property.superBuiltUpArea ? ` (${property.superBuiltUpArea})` : ''}`;
    } else {
      return appendSqft(property.size);
    }
  }

  const getPriceDisplay = () => {
    if (property.price === "Price On Request") {
      return "Price On Request"
    }
    return property.price
  }

  return (
    <>
      <article className="group bg-orange-50 rounded-xl md:rounded-2xl overflow-hidden shadow-gray-soft hover:shadow-orange-medium focus-within:shadow-orange-medium transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 focus-within:scale-105 border border-gray-100 outline-none focus-within:ring-2 focus-within:ring-orange-400">
        {/* Property Image with Consistent Theme */}
        <div className="relative h-48 sm:h-56 w-full bg-gradient-gray-light overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-orange-50">
              <LoadingSpinner size="lg" />
            </div>
          )}

          <Image
            src={imageError ? "/placeholder.svg?height=300&width=400" : property.image}
            alt={`${property.name} - ${getPropertyTypeText()} in ${property.location}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Consistent Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-900/50 via-black-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge - Orange Theme Only */}
          <div className="absolute top-3 md:top-4 left-3 md:left-4">
            <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold text-white shadow-lg bg-gradient-orange-warm">
              {isCommercial ? "🏢 Commercial" : "🏠 Residential"}
            </span>
          </div>

          {/* Property Type Badge */}
          <div className="absolute top-3 md:top-4 right-3 md:right-4">
            <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold bg-orange-solid text-gray-800 shadow-lg border border-orange-200">
              {property.type}
            </span>
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 px-4">
              <button
                onClick={handleKnowMoreClick}
                className="bg-gradient-orange-light hover:bg-gradient-orange-warm text-orange-800 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm shadow-orange-soft border border-orange-200"
              >
                View Details
              </button>
              <button
                onClick={handleEnquireClick}
                className="bg-gradient-orange-warm hover:shadow-orange-medium text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm shadow-orange-soft"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Card Content with Consistent Theme */}
        <div className="p-4 md:p-6">
          {/* Header Section */}
          <div className="mb-4 md:mb-5">
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-700 to-orange-800 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300">
                {property.name}
              </h3>
            </div>
            {/* Show BHK range only once for residential */}
            {!isCommercial && (
              <p className="text-sm text-gray-600 font-medium">
                {property.priceDescription}
              </p>
            )}
            {/* Developer Information for Commercial Properties */}
            {isCommercial && property.developer && (
              <div className="flex items-center mt-2">
                <User className="h-3 w-3 mr-1 text-orange-600" />
                <p className="text-xs text-orange-700 font-medium">Developer: {property.developer}</p>
              </div>
            )}
          </div>

          {/* Pricing Section */}
          {isCommercial ? (
            <div className="mb-1 md:mb-2">
              {/* Office Space Card */}
              {property.officeSize && (
                <div className="flex items-center justify-between p-2 mb-1 bg-orange-solid rounded-xl border border-orange-200 shadow-orange-soft">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-orange-700" />
                    <div>
                      <div className="text-[10px] text-gray-500 font-medium">Office Space</div>
                      <div className="text-xs md:text-sm font-bold text-gray-800">{appendSqft(property.officeSize)}</div>
                    </div>
                  </div>
                  {property.officePrice && (
                    <div className="text-xs md:text-sm font-bold text-orange-700">{property.officePrice}</div>
                  )}
                </div>
              )}
              {/* Showroom Space Card */}
              {property.showroomSize && (
                <div className="flex items-center justify-between p-2 mb-1 bg-orange-solid rounded-xl border border-orange-200 shadow-orange-soft">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-orange-700" />
                    <div>
                      <div className="text-[10px] text-gray-500 font-medium">Showroom Space</div>
                      <div className="text-xs md:text-sm font-bold text-gray-800">{appendSqft(property.showroomSize)}</div>
                    </div>
                  </div>
                  {property.showroomPrice && (
                    <div className="text-xs md:text-sm font-bold text-orange-700">{property.showroomPrice}</div>
                  )}
                </div>
              )}
              {/* Possession Card */}
              <div className="flex items-center justify-between p-2 mb-1 bg-orange-solid rounded-xl border border-orange-200 shadow-orange-soft">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-orange-700" />
                  <div>
                    <div className="text-[10px] text-gray-500 font-medium">Possession</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800">{property.possession || "TBA"}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Residential: Price, Possession, and Size in card style, matching commercial */
            <div className="mb-1 md:mb-2">
              <div className="p-2 md:p-2.5 bg-gradient-orange-light rounded-xl border border-orange-200 shadow-orange-soft text-center mb-1">
                <p className="text-[11px] font-semibold text-orange-700 mb-0.5">Price</p>
                <p className="text-base md:text-lg font-bold text-orange-800 mb-0.5">{getPriceDisplay()} {property.priceUnit}</p>
              </div>
              {/* Possession Card */}
              <div className="flex items-center justify-between p-2 mb-1 bg-orange-solid rounded-xl border border-orange-200 shadow-orange-soft">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-orange-700" />
                  <div>
                    <div className="text-[10px] text-gray-500 font-medium">Possession</div>
                    <div className="text-xs md:text-sm font-bold text-gray-800">{property.possession || "TBA"}</div>
                  </div>
                </div>
              </div>
              {/* Size Card (if present) */}
              {property.size && (
                <div className="flex items-center justify-between p-2 mb-1 bg-orange-solid rounded-xl border border-orange-200 shadow-orange-soft">
                  <div className="flex items-center gap-1.5">
                    <Square className="h-4 w-4 text-orange-700" />
                    <div>
                      <div className="text-[10px] text-gray-500 font-medium">Size</div>
                      <div className="text-xs md:text-sm font-bold text-gray-800">{formatSizeDisplay()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Commercial Suitable For Tags */}
          {isCommercial && property.suitableFor && (
            <div className="mb-4 md:mb-5">
              <p className="text-xs text-gray-500 mb-2">Suitable For:</p>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {property.suitableFor.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 text-xs rounded-full font-medium border border-orange-200"
                  >
                    {item}
                  </span>
                ))}
                {property.suitableFor.length > 3 && (
                  <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-full font-medium border border-gray-200">
                    +{property.suitableFor.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 md:space-y-3">
            <button
              onClick={handleKnowMoreClick}
              className="w-full bg-gradient-orange-warm hover:shadow-orange-medium text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all duration-300 text-sm shadow-orange-soft transform hover:scale-[1.02]"
            >
              Know More
            </button>
            <button
              onClick={handleEnquireClick}
              className="w-full border-2 border-orange-300 bg-gradient-orange-light text-orange-700 hover:bg-gradient-orange-warm hover:text-white hover:border-orange-600 font-semibold py-2.5 md:py-3 rounded-xl transition-all duration-300 text-sm transform hover:scale-[1.02]"
            >
              Enquire Now
            </button>
          </div>

          {/* RERA Information */}
          {property.rera && (
            <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed break-words" title={property.rera}>
                <span className="font-semibold">RERA:</span> {property.rera}
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Property Details Modal */}
      <PropertyDetailsModal isOpen={showDetailsModal} onClose={handleCloseDetailsModal} property={property} />

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={showEnquiryModal} onClose={handleCloseEnquiryModal} property={property} />
    </>
  )
})

export default PropertyCard
