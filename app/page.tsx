"use client"

import { Suspense, useState } from "react"
import Hero from "@/components/Hero"
import PropertyGrid from "@/components/PropertyGrid"
import ContactSection from "@/components/ContactSection"
import VirtualTours from "@/components/VirtualTours"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { getPropertiesByCategory } from "@/lib/data"
import { Building2, HomeIcon } from "lucide-react"

function LoadingSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-orange-600">Loading properties...</p>
    </div>
  )
}

async function ResidentialPropertiesContent() {
  const properties = await getPropertiesByCategory("residential")
  const selectedProperties = properties.slice(0, 3)

  return (
    <section className="mb-20">
      <div className="flex items-center mb-8">
        <div className="mr-4 p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl shadow-orange-soft">
          <HomeIcon className="h-6 w-6 text-orange-700" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Residential Properties in Adani Shantigram
        </h2>
      </div>
      <ErrorBoundary>
        <PropertyGrid properties={selectedProperties} />
      </ErrorBoundary>
    </section>
  )
}

async function CommercialPropertiesContent() {
  const properties = await getPropertiesByCategory("commercial")
  // Show all 7 commercial properties
  const selectedProperties = properties

  return (
    <section className="mb-20">
      <div className="flex items-center mb-8">
        <div className="mr-4 p-3 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl shadow-orange-soft">
          <Building2 className="h-6 w-6 text-orange-800" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Commercial Properties in Adani Shantigram
        </h2>
      </div>
      <p className="text-gray-600 mb-8 text-center max-w-4xl mx-auto">
        Discover premium commercial spaces including office spaces and showrooms from leading developers like Shilp
        Group, Shivalik Group, Kaavyaratna & Ekarth Group, Nakshatra Group, Dobariya, Rashmi & Sangini Group, and Yogi &
        Akshar & Globe & United Buildcon. All projects feature modern amenities, strategic locations, and flexible
        pricing options.
      </p>
      <ErrorBoundary>
        <PropertyGrid properties={selectedProperties} />
      </ErrorBoundary>
    </section>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential")

  const handleTabChange = (tab: "residential" | "commercial") => {
    setActiveTab(tab)
  }

  return (
    <>
      {/* Hero Section with Consistent Theme */}
      <Hero
        title={
          activeTab === "residential"
            ? "Discover Your Dream Home in Adani Shantigram"
            : "Find Your Perfect Business Space in Adani Shantigram"
        }
        subtitle={
          activeTab === "residential"
            ? "Premium residential projects with world-class amenities and modern architecture. Your dream home awaits in the heart of Ahmedabad."
            : "State-of-the-art commercial spaces designed for modern businesses. From office spaces to retail outlets, find the perfect space for your business growth."
        }
        backgroundImage="/placeholder.svg?height=800&width=1400"
      />

      {/* Tab Navigation - Orange, White, Gray Only */}
      <div className="bg-gradient-gray-light border-b border-gray-200 shadow-gray-soft">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-4">
            <div className="flex space-x-2 bg-gradient-white-soft rounded-2xl p-2 shadow-gray-soft border border-gray-200">
              <button
                onClick={() => handleTabChange("residential")}
                className={`flex items-center px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === "residential"
                    ? "bg-gradient-orange-warm text-white shadow-orange-soft transform scale-105"
                    : "text-orange-700 hover:text-orange-800 hover:bg-gradient-orange-light"
                }`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Residential Properties
              </button>
              <button
                onClick={() => handleTabChange("commercial")}
                className={`flex items-center px-8 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activeTab === "commercial"
                    ? "bg-gradient-orange-dark text-white shadow-orange-soft transform scale-105"
                    : "text-orange-700 hover:text-orange-800 hover:bg-gradient-orange-light"
                }`}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Commercial Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Content - Light Gray Background */}
      <div className="bg-gradient-gray-light min-h-screen">
        <div className="container mx-auto px-4 py-16" id="properties">
          <Suspense fallback={<LoadingSection />}>
            {activeTab === "residential" ? <ResidentialPropertiesContent /> : <CommercialPropertiesContent />}
          </Suspense>
        </div>
      </div>

      {/* Virtual Tours Section */}
      <div className="bg-gradient-white-soft">
        <div className="container mx-auto px-4 py-16">
          <ErrorBoundary>
            <div id="virtual-tours">
              <VirtualTours />
            </div>
          </ErrorBoundary>
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
