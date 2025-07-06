import PropertyCard from "./PropertyCard"
import type { Property } from "@/lib/types"

interface PropertyGridProps {
  properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-8 md:py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600 text-sm md:text-base">
            We're currently updating our property listings. Please check back soon or contact us for more information.
          </p>
        </div>
      </div>
    )
  }

  // Enhanced responsive grid with better spacing for all screen sizes
  return (
    <>
      <div className="my-8 border-t-2 border-orange-100 w-full max-w-7xl mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 xl:gap-20 max-w-7xl mx-auto">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  )
}
