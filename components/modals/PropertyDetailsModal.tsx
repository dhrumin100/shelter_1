"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  X,
  Square,
  Calendar,
  MapPin,
  Home,
  Dumbbell,
  Phone,
  Mail,
  Share2,
  Heart,
  Building,
  Car,
  Wifi,
  Shield,
  Zap,
  Trees,
  Users,
  Camera,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  Calculator,
  Clock,
  Maximize2,
  Grid3X3,
  Download,
} from "lucide-react"
import type { Property } from "@/lib/types"
import PropertyAmenities from "../PropertyAmenities"
import UniversalForm from "../forms/UniversalForm"

interface PropertyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

export default function PropertyDetailsModal({ isOpen, onClose, property }: PropertyDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.gallery.length) % property.gallery.length)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Check out this amazing ${property.bhk} BHK property in ${property.location}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Universal floor plans for ALL properties (both commercial and residential)
  const universalFloorPlans = [
    {
      id: "master",
      title: "Master Plan",
      image: "/images/floor-plans/master-plan.jpg",
      description: "Complete project layout and master planning",
    },
    {
      id: "floor",
      title: "Floor Plan",
      image: "/images/floor-plans/floor-plan.png",
      description: "Detailed floor layout and space planning",
    },
    {
      id: "costing",
      title: "Costing Details",
      image: "/images/floor-plans/costing-details.png",
      description: "Detailed pricing and costing information",
    },
  ]

  const sendToWhatsApp = (planTitle: string) => {
    const phoneNumber = "9714512452"
    const isCommercial = property.category === "commercial"

    const message = `Hi, I'm interested in ${property.name} at Adani Shantigram. Please send me the ${planTitle} for this ${isCommercial ? property.type : `${property.bhk} BHK ${property.type}`}.

Property Details:
- Name: ${property.name}
- Type: ${isCommercial ? property.type : `${property.bhk} BHK ${property.type}`}
- Price: ${property.price} ${property.priceUnit}
- Size: ${property.size} ${isCommercial ? "sqft" : property.type === "Villa" ? "sq. yard" : "sqft"}
- Location: ${property.location}

Thank you!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  const isCommercial = property.category === "commercial"
  const propertyTypeText = isCommercial
    ? property.type
    : property.type === "Villa"
      ? property.name === "West Park"
        ? "Build To Suit Villas"
        : `${property.bhk} BHK Villas`
      : `${property.bhk} BHK Apartment`

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

  // Fix price display to avoid double rupee symbols
  const formatPrice = (price: string) => {
    if (price === "Price On Request") return price
    // Remove any existing ₹ symbols and add only one
    const cleanPrice = price.replace(/₹/g, "")
    return `₹${cleanPrice}`
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "amenities", label: "Amenities", icon: Dumbbell },
    { id: "plans", label: "Floor Plans", icon: FileText },
    { id: "pricing", label: "Pricing", icon: Calculator },
    { id: "contact", label: "Contact", icon: Phone },
  ]

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Enhanced Backdrop with Better Blur */}
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
          onClick={handleClose}
        />

        {/* Modal Container with Enhanced Design */}
        <div className="flex h-full items-center justify-center p-2">
          <div
            className={`relative bg-white rounded-3xl shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] overflow-hidden transform transition-all duration-500 border border-gray-100 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Enhanced Header with Better Transparency */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-black/90 via-black/85 to-black/80 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleClose}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label="Close"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <div className="text-white">
                    <h1 className="text-2xl font-bold mb-1 drop-shadow-lg">{property.name}</h1>
                    <p className="text-white/90 text-lg drop-shadow-md">
                      {propertyTypeText} in {property.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                      isLiked
                        ? "bg-orange-500 text-white scale-110 shadow-lg"
                        : "bg-white/20 hover:bg-white/30 text-white hover:scale-110"
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
                  >
                    <Share2 className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="h-full overflow-y-auto pt-24">
              {/* Enhanced Hero Section */}
              <div className="relative">
                {activeTab === "gallery" ? (
                  /* Gallery View */
                  <div className="bg-black">
                    <div className="relative h-[65vh] w-full bg-black flex items-center justify-center">
                      <Image
                        src={property.gallery[currentImageIndex] || "/placeholder.svg?height=600&width=1200"}
                        alt={`${property.name} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />

                      {property.gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
                          >
                            <ChevronLeft className="h-8 w-8" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
                          >
                            <ChevronRight className="h-8 w-8" />
                          </button>
                        </>
                      )}

                      <div className="absolute bottom-8 right-8 bg-white/90 text-gray-800 px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                        {currentImageIndex + 1} / {property.gallery.length}
                      </div>

                      <button
                        onClick={() => setShowFullscreenGallery(true)}
                        className="absolute top-8 right-8 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
                      >
                        <Maximize2 className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="bg-white p-8">
                      <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                            <Camera className="h-6 w-6 mr-3 text-orange-600" />
                            All Images
                          </h3>
                          <button
                            onClick={() => setShowFullscreenGallery(true)}
                            className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                          >
                            <Grid3X3 className="h-5 w-5 mr-2" />
                            View All
                          </button>
                        </div>

                        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                          {property.gallery.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`relative aspect-square rounded-xl overflow-hidden border-3 transition-all duration-200 hover:scale-105 group ${
                                currentImageIndex === index
                                  ? "border-orange-500 shadow-orange-soft ring-2 ring-orange-200"
                                  : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
                              }`}
                            >
                              <Image
                                src={image || "/placeholder.svg?height=120&width=120"}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="120px"
                              />
                              {currentImageIndex === index && (
                                <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                                  <div className="bg-orange-500 text-white rounded-full p-1">
                                    <Camera className="h-4 w-4" />
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Enhanced Hero Image for Other Tabs */
                  <div className="relative h-[55vh] w-full overflow-hidden">
                    <Image
                      src={property.heroImage || property.image || "/placeholder.svg?height=500&width=1200"}
                      alt={property.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

                    {/* Enhanced Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                          <div>
                            <div className="flex items-center space-x-3 mb-4">
                              <span
                                className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 ${
                                  isCommercial ? "bg-orange-600/90" : "bg-orange-500/90"
                                }`}
                              >
                                {isCommercial ? "🏢 Commercial" : "🏠 Residential"}
                              </span>
                              <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm border border-white/20">
                                {property.type}
                              </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">{property.name}</h2>
                            <p className="text-xl lg:text-2xl mb-6 text-white/95 drop-shadow-md">
                              {propertyTypeText} in {property.location}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-lg">
                              <span className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                                <Square className="h-5 w-5 mr-2" />
                                {formatSizeDisplay()}
                              </span>
                              <span className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                                <Calendar className="h-5 w-5 mr-2" />
                                {property.possession || "TBA"}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
                              <p className="text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg">
                                {property.price === "Price On Request"
                                  ? "Price On Request"
                                  : `${formatPrice(property.price)} ${property.priceUnit}`}
                              </p>
                              <p className="text-lg text-white/90 drop-shadow-md">{property.priceDescription}</p>
                              {isCommercial && property.pricePerSqft && (
                                <p className="text-lg text-white/90 drop-shadow-md">{property.pricePerSqft} per sqft</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Navigation Tabs */}
              <div className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-10 shadow-lg">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-8 py-5 text-base font-semibold whitespace-nowrap border-b-3 transition-all duration-300 ${
                          activeTab === tab.id
                            ? "border-orange-500 text-orange-600 bg-orange-50/80 backdrop-blur-sm shadow-sm"
                            : "border-transparent text-gray-600 hover:text-orange-600 hover:bg-orange-25/50 hover:border-orange-200"
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 bg-gradient-to-b from-white to-gray-50/50">
                {activeTab === "overview" && (
                  <div className="space-y-10">
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      <div className="bg-gradient-orange-light rounded-2xl p-6 text-center border border-orange-200 shadow-orange-soft">
                        <Square className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 text-lg">Size</h3>
                        <p className="text-orange-700 font-medium">{formatSizeDisplay()}</p>
                      </div>

                      <div className="bg-gradient-orange-light rounded-2xl p-6 text-center border border-orange-200 shadow-orange-soft">
                        <Calendar className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 text-lg">Possession</h3>
                        <p className="text-orange-700 font-medium">{property.possession || "TBA"}</p>
                      </div>

                      <div className="bg-gradient-orange-light rounded-2xl p-6 text-center border border-orange-200 shadow-orange-soft">
                        <Home className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 text-lg">Type</h3>
                        <p className="text-orange-700 font-medium">{propertyTypeText}</p>
                      </div>

                      <div className="bg-gradient-orange-light rounded-2xl p-6 text-center border border-orange-200 shadow-orange-soft">
                        <MapPin className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-bold text-gray-800 text-lg">Location</h3>
                        <p className="text-orange-700 font-medium">{property.location}</p>
                      </div>
                    </div>

                    {/* Commercial Specific Stats */}
                    {isCommercial && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {property.parkingSpaces !== undefined && (
                          <div className="bg-gradient-gray-light rounded-2xl p-6 text-center border border-gray-200 shadow-gray-soft">
                            <Car className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-800 text-lg">Parking</h3>
                            <p className="text-gray-600 font-medium">{property.parkingSpaces} Spaces</p>
                          </div>
                        )}

                        {property.floorDetails && (
                          <div className="bg-gradient-gray-light rounded-2xl p-6 text-center border border-gray-200 shadow-gray-soft">
                            <Building className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-800 text-lg">Floor</h3>
                            <p className="text-gray-600 font-medium">{property.floorDetails}</p>
                          </div>
                        )}

                        {property.suitableFor && (
                          <div className="bg-gradient-gray-light rounded-2xl p-6 text-center border border-gray-200 shadow-gray-soft">
                            <Users className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-800 text-lg">Suitable For</h3>
                            <p className="text-gray-600 font-medium">{property.suitableFor.slice(0, 2).join(", ")}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-gray-soft">
                      <h2 className="text-3xl font-bold mb-6 text-gray-800">About {property.name}</h2>
                      <p className="text-gray-700 leading-relaxed text-xl">{property.description}</p>
                    </div>

                    {/* Key Features */}
                    <div className="bg-gradient-orange-light rounded-2xl p-8 border border-orange-200 shadow-orange-soft">
                      <h3 className="text-2xl font-bold mb-6 text-orange-800">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { icon: Shield, text: "RERA Approved" },
                          { icon: Zap, text: "24/7 Power Backup" },
                          { icon: Wifi, text: "High Speed Internet" },
                          { icon: Trees, text: "Green Spaces" },
                          { icon: Car, text: "Ample Parking" },
                          { icon: Users, text: "Community Living" },
                        ].map((feature, index) => {
                          const Icon = feature.icon
                          return (
                            <div
                              key={index}
                              className="flex items-center p-4 bg-white rounded-xl border border-orange-100 shadow-sm hover:shadow-orange-soft transition-all duration-200"
                            >
                              <Icon className="h-6 w-6 text-orange-600 mr-4" />
                              <span className="text-gray-700 font-semibold">{feature.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* RERA Information */}
                    {property.rera && (
                      <div className="bg-gradient-gray-light rounded-2xl p-8 border border-gray-200 shadow-gray-soft">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">RERA Information</h3>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <p className="text-gray-600 break-words text-lg">
                            <span className="font-bold text-gray-800">RERA Number:</span> {property.rera}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="space-y-8">
                    <div className="text-center bg-gradient-orange-light rounded-2xl p-8 border border-orange-200">
                      <h3 className="text-2xl font-bold text-orange-800 mb-4">Experience Virtual Tour</h3>
                      <p className="text-orange-700 mb-6">Take an immersive 360° virtual tour of {property.name}</p>
                      <button className="bg-gradient-orange-warm hover:bg-gradient-orange-dark text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-orange-soft hover:shadow-orange-medium transform hover:scale-105 flex items-center mx-auto">
                        <Play className="h-6 w-6 mr-3" />
                        Take Virtual Tour
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">Amenities & Features</h2>
                    <PropertyAmenities amenities={property.amenities} />
                  </div>
                )}

                {activeTab === "plans" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">Floor Plans & Layouts</h2>
                    <p className="text-gray-600 text-lg">Download detailed plans and layouts for {property.name}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {universalFloorPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-orange-soft transition-all duration-300 shadow-gray-soft"
                        >
                          <div className="relative h-64 w-full bg-gradient-gray-light">
                            <Image
                              src={plan.image || "/placeholder.svg"}
                              alt={plan.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* Overlay with document icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 rounded-full p-4 shadow-lg">
                                <FileText className="h-8 w-8 text-orange-600" />
                              </div>
                            </div>
                          </div>

                          <div className="p-6 text-center">
                            <h3 className="font-bold text-xl mb-2 text-gray-800">{plan.title}</h3>
                            <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                            <button
                              onClick={() => sendToWhatsApp(plan.title)}
                              className="w-full bg-gradient-orange-warm hover:bg-gradient-orange-dark text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-orange-soft hover:shadow-orange-medium transform hover:scale-[1.02]"
                            >
                              <Download className="w-5 h-5 mr-2" />
                              Get {plan.title}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Information */}
                    <div className="bg-gradient-orange-light rounded-2xl p-8 border border-orange-200 shadow-orange-soft">
                      <div className="flex items-start">
                        <div className="bg-orange-100 rounded-full p-3 mr-6">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-3 text-xl">Quick Response Guarantee</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Our team will respond to your plan request within 30 minutes during business hours (10 AM -
                            6 PM, Mon-Sat). All plans are sent as high-quality PDF documents via WhatsApp for your
                            convenience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "pricing" && (
                  <div className="space-y-8">
                    <div className="bg-gradient-orange-light rounded-2xl p-8 border border-orange-200 shadow-orange-soft">
                      <h2 className="text-3xl font-bold mb-8 text-orange-800">Pricing Details</h2>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Base Price Section */}
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3 text-xl">Base Price</h3>
                            <p className="text-3xl font-bold text-orange-700 mb-2">
                              {property.price === "Price On Request"
                                ? "Price On Request"
                                : `${formatPrice(property.price)} ${property.priceUnit}`}
                            </p>
                            <p className="text-gray-600">{property.priceDescription}</p>
                          </div>

                          {isCommercial && property.pricePerSqft && (
                            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                              <h3 className="font-bold text-gray-800 mb-3 text-xl">Price per Sq Ft</h3>
                              <p className="text-2xl font-bold text-orange-700">{property.pricePerSqft}</p>
                            </div>
                          )}

                          {/* Commercial Detailed Pricing */}
                          {isCommercial && (property.officePrice || property.showroomPrice) && (
                            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                              <h3 className="font-bold text-gray-800 mb-4 text-xl">Detailed Pricing</h3>
                              <div className="space-y-3">
                                {property.officeSize && property.officePrice && (
                                  <div className="flex justify-between items-center p-3 bg-gradient-gray-light rounded-lg">
                                    <div>
                                      <p className="font-semibold text-gray-800">Office Space</p>
                                      <p className="text-sm text-gray-600">{property.officeSize}</p>
                                    </div>
                                    <p className="font-bold text-orange-700">{formatPrice(property.officePrice)}</p>
                                  </div>
                                )}

                                {property.showroomSize && property.showroomPrice && (
                                  <div className="flex justify-between items-center p-3 bg-gradient-gray-light rounded-lg">
                                    <div>
                                      <p className="font-semibold text-gray-800">Showroom Space</p>
                                      <p className="text-sm text-gray-600">{property.showroomSize}</p>
                                    </div>
                                    <p className="font-bold text-orange-700">{formatPrice(property.showroomPrice)}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payment Plans Section - Only This Section Kept */}
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 text-xl">Payment Plans Available</h3>
                            <ul className="text-gray-700 space-y-3">
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>Construction Linked Payment Plan</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>Subvention Scheme Available</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>Bank Loan Assistance</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>Flexible Payment Options</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>No Hidden Charges</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>GST Included in Price</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "contact" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Contact Information */}
                      <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>

                        <div className="space-y-6">
                          <div className="flex items-start p-6 bg-white rounded-2xl border border-gray-200 shadow-gray-soft">
                            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-4 mr-6">
                              <Phone className="h-6 w-6 text-orange-700" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-xl">Phone</h3>
                              <p className="text-gray-600 text-lg">9714512452</p>
                              <p className="text-gray-500">Available 10 AM - 6 PM</p>
                            </div>
                          </div>

                          <div className="flex items-start p-6 bg-white rounded-2xl border border-gray-200 shadow-gray-soft">
                            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-4 mr-6">
                              <Mail className="h-6 w-6 text-orange-700" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-xl">Email</h3>
                              <p className="text-gray-600 text-lg">info@shelter4u.in</p>
                              <p className="text-gray-500">Response within 2 hours</p>
                            </div>
                          </div>

                          <div className="flex items-start p-6 bg-white rounded-2xl border border-gray-200 shadow-gray-soft">
                            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-4 mr-6">
                              <Clock className="h-6 w-6 text-orange-700" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-xl">Site Visit</h3>
                              <p className="text-gray-600 text-lg">Schedule a visit</p>
                              <p className="text-gray-500">Free pickup & drop available</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Form */}
                      <div className="bg-gradient-orange-light rounded-2xl p-8 border border-orange-200 shadow-orange-soft">
                        <h3 className="text-2xl font-bold mb-6 text-orange-800">Send us a Message</h3>
                        <UniversalForm
                          type="enquiry"
                          propertyName={property.name}
                          title=""
                          description=""
                          className="space-y-5"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {showFullscreenGallery && (
        <div className="fixed inset-0 z-[60] bg-black">
          <div className="flex items-center justify-between p-6 bg-black/95">
            <h2 className="text-white text-2xl font-bold">{property.name} - Gallery</h2>
            <button
              onClick={() => setShowFullscreenGallery(false)}
              className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 h-[calc(100vh-100px)] overflow-y-auto">
            {property.gallery.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg?height=300&width=300"}
                  alt={`${property.name} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
