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

  const formatSizeDisplay = () => {
    if (isCommercial) {
      return `${property.size} sqft`
    }
    if (property.type === "Villa") {
      return `${property.size} sq. yard ${property.superBuiltUpArea}`
    } else {
      if (property.superBuiltUpArea && property.superBuiltUpArea !== "") {
        return `${property.size} sqft. (${property.superBuiltUpArea} Carpet Area)`
      } else {
        return `${property.size} sqft.`
      }
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
      <article className="group bg-gradient-white-soft rounded-xl md:rounded-2xl overflow-hidden shadow-gray-soft hover:shadow-orange-medium focus-within:shadow-orange-medium transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-105 focus-within:scale-105 border border-gray-100 outline-none focus-within:ring-2 focus-within:ring-orange-400">
        {/* Property Image with Consistent Theme */}
        <div className="relative h-48 sm:h-56 w-full bg-gradient-gray-light overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
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
            <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold bg-gradient-white-soft text-gray-800 shadow-lg border border-gray-200">
              {property.type}
            </span>
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 px-4">
              <button
                onClick={handleKnowMoreClick}
                className="bg-gradient-white-soft hover:bg-gray-50 text-gray-800 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm shadow-gray-soft border border-gray-200"
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

            <p className="text-sm text-gray-600 font-medium">
              {getPropertyTypeText()}
            </p>

            {/* Developer Information for Commercial Properties */}
            {isCommercial && property.developer && (
              <div className="flex items-center mt-2">
                <User className="h-3 w-3 mr-1 text-orange-600" />
                <p className="text-xs text-orange-700 font-medium">Developer: {property.developer}</p>
              </div>
            )}
          </div>

          {/* Company Logo with Consistent Frame */}
          <div className="flex justify-center mb-4 md:mb-5">
            <div className="relative h-6 md:h-8 w-16 md:w-20 bg-gradient-gray-light rounded-lg p-1 md:p-1.5 border border-gray-200 shadow-sm">
              <Image
                src={property.companyLogo || "/placeholder.svg?height=32&width=80"}
                alt="Developer Logo"
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          </div>

          {/* Enhanced Pricing Section for Commercial Properties */}
          {isCommercial ? (
            <div className="mb-4 md:mb-6 space-y-3">
              {/* Main Price Display */}
              <div className="text-center p-3 md:p-4 bg-gradient-orange-light rounded-xl border border-orange-200 shadow-gray-soft">
                <p className="text-xs font-semibold text-orange-700 mb-1">Price Range</p>
                <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-700 to-orange-800 bg-clip-text text-transparent">
                  {getPriceDisplay()}
                </p>
                <p className="text-xs text-gray-500 mt-1">{property.priceDescription}</p>
              </div>

              {/* Detailed Pricing Breakdown */}
              <div className="grid grid-cols-1 gap-2">
                {property.officeSize && property.officePrice && (
                  <div className="flex items-center justify-between p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-2">
                        <Briefcase className="h-3 w-3 text-orange-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Office Space</p>
                        <p className="text-sm font-semibold text-gray-800">{property.officeSize}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-700">{property.officePrice}</p>
                    </div>
                  </div>
                )}

                {property.showroomSize && property.showroomPrice && (
                  <div className="flex items-center justify-between p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-2">
                        <Building2 className="h-3 w-3 text-orange-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Showroom Space</p>
                        <p className="text-sm font-semibold text-gray-800">{property.showroomSize}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-700">{property.showroomPrice}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Regular Pricing Section for Residential */
            <div className="text-center mb-4 md:mb-6 p-3 md:p-4 bg-gradient-orange-light rounded-xl border border-orange-200 shadow-gray-soft">
              <p className="text-xs font-semibold text-orange-700 mb-1">{`${getPropertyTypeText()} Starts From`}</p>
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-700 to-orange-800 bg-clip-text text-transparent">
                {getPriceDisplay()} {property.priceUnit}
              </p>
              <p className="text-xs text-gray-500 mt-1">{property.priceDescription}</p>
            </div>
          )}

          {/* Property Details Grid - Enhanced for Commercial */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="flex items-center p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-sm">
                <Square className="h-3 w-3 md:h-4 md:w-4 text-orange-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-xs md:text-sm font-semibold text-gray-800">{formatSizeDisplay()}</p>
              </div>
            </div>

            <div className="flex items-center p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-sm">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 text-orange-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Possession</p>
                <p className="text-xs md:text-sm font-semibold text-gray-800">{property.possession || "TBA"}</p>
              </div>
            </div>

            {/* Commercial-specific details - Orange Theme Only */}
            {isCommercial && (
              <>
                {property.parkingSpaces !== undefined && (
                  <div className="flex items-center p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-sm">
                      <Car className="h-3 w-3 md:h-4 md:w-4 text-orange-800" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Parking</p>
                      <p className="text-xs md:text-sm font-semibold text-gray-800">{property.parkingSpaces} Spaces</p>
                    </div>
                  </div>
                )}

                {property.floorDetails && (
                  <div className="flex items-center p-2 md:p-3 bg-gradient-gray-light rounded-lg border border-gray-200">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full flex items-center justify-center mr-2 md:mr-3 shadow-sm">
                      <Building2 className="h-3 w-3 md:h-4 md:w-4 text-orange-800" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Floor</p>
                      <p className="text-xs md:text-sm font-semibold text-gray-800">{property.floorDetails}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Commercial Suitable For Tags - Orange Theme */}
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

          {/* Action Buttons - Consistent Orange Theme */}
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
