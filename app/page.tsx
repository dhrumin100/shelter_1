"use client"

import { Suspense, useState, useEffect } from "react"
import Hero from "@/components/Hero"
import PropertyGrid from "@/components/PropertyGrid"
import ContactSection from "@/components/ContactSection"
import VirtualTours from "@/components/VirtualTours"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { getPropertiesByCategory } from "@/lib/data"
import { Building2, HomeIcon } from "lucide-react"
import Header from "@/components/Header"

function LoadingSection() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-orange-600 text-sm md:text-base">Loading properties...</p>
    </div>
  )
}

function ResidentialPropertiesContent({ properties }: { properties: any[] }) {
  // Show all residential properties
  return (
    <section className="mb-12 md:mb-20" id="residential">
      <div className="flex items-center mb-6 md:mb-8">
        <div className="mr-3 md:mr-4 p-2 md:p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl shadow-orange-soft">
          <HomeIcon className="h-5 w-5 md:h-6 md:w-6 text-orange-700" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Residential Properties
        </h2>
      </div>
      <ErrorBoundary>
        <PropertyGrid properties={properties} />
      </ErrorBoundary>
    </section>
  )
}

function CommercialPropertiesContent({ properties }: { properties: any[] }) {
  // Show all 7 commercial properties
  const selectedProperties = properties
  return (
    <section className="mb-12 md:mb-20" id="commercial">
      <div className="flex items-center mb-6 md:mb-8">
        <div className="mr-3 md:mr-4 p-2 md:p-3 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl shadow-orange-soft">
          <Building2 className="h-5 w-5 md:h-6 md:w-6 text-orange-800" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Commercial Properties
        </h2>
      </div>
      <p className="text-gray-600 mb-6 md:mb-8 text-center max-w-4xl mx-auto text-sm md:text-base px-4">
        Discover premium commercial spaces including office spaces and showrooms from leading developers. All projects feature modern amenities, strategic locations, and flexible pricing options.
      </p>
      <ErrorBoundary>
        <PropertyGrid properties={selectedProperties} />
      </ErrorBoundary>
    </section>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential")
  const [residentialProperties, setResidentialProperties] = useState<any[] | null>(null)
  const [commercialProperties, setCommercialProperties] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const syncTabWithHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash === "commercial" || hash === "residential") {
        setActiveTab(hash as "residential" | "commercial")
      }
    }
    syncTabWithHash()
    window.addEventListener("hashchange", syncTabWithHash)
    return () => {
      window.removeEventListener("hashchange", syncTabWithHash)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      getPropertiesByCategory("residential"),
      getPropertiesByCategory("commercial")
    ])
      .then(([res, com]) => {
        setResidentialProperties(res)
        setCommercialProperties(com)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load properties.")
        setLoading(false)
      })
  }, [])

  const handleTabChange = (tab: "residential" | "commercial") => {
    setActiveTab(tab)
    window.location.hash = tab
  }

  return (
    <>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      {/* Hero Section with Consistent Theme */}
      <Hero
        title={
          activeTab === "residential"
            ? "Discover Your Dream Home"
            : "Find Your Perfect Business Space"
        }
        subtitle={
          activeTab === "residential"
            ? "Premium residential projects with world-class amenities and modern architecture. Your dream home awaits."
            : "State-of-the-art commercial spaces designed for modern businesses. From office spaces to retail outlets, find the perfect space for your business growth."
        }
        backgroundImage="/images/main.jpg"
      />

      {/* Tab Navigation - Orange, White, Gray Only */}
      <div className="bg-gradient-gray-light border-b border-gray-200 shadow-gray-soft">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-3 md:py-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-gradient-white-soft rounded-2xl p-2 shadow-gray-soft border border-gray-200 w-full sm:w-auto">
              <button
                onClick={() => handleTabChange("residential")}
                className={`flex items-center justify-center px-4 md:px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto ${activeTab === "residential"
                  ? "bg-gradient-orange-warm text-white shadow-orange-soft transform scale-105"
                  : "text-orange-700 hover:text-orange-800 hover:bg-gradient-orange-light"
                  }`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Residential Properties</span>
                <span className="sm:hidden">Residential</span>
              </button>
              <button
                onClick={() => handleTabChange("commercial")}
                className={`flex items-center justify-center px-4 md:px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto ${activeTab === "commercial"
                  ? "bg-gradient-orange-dark text-white shadow-orange-soft transform scale-105"
                  : "text-orange-700 hover:text-orange-800 hover:bg-gradient-orange-light"
                  }`}
              >
                <Building2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Commercial Properties</span>
                <span className="sm:hidden">Commercial</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Content - Light Gray Background */}
      <div className="bg-gradient-gray-light min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-16" id="properties">
          {loading ? (
            <LoadingSection />
          ) : error ? (
            <div className="text-red-600 text-center py-8 text-sm md:text-base">{error}</div>
          ) : activeTab === "residential" ? (
            <ResidentialPropertiesContent properties={residentialProperties || []} />
          ) : (
            <CommercialPropertiesContent properties={commercialProperties || []} />
          )}
        </div>
      </div>

      {/* Contact Section */}
      <ErrorBoundary>
        <div id="contact">
          <ContactSection />
        </div>
      </ErrorBoundary>
    </>
  )
}
