import PropertyCard from "./PropertyCard"
import type { Property } from "@/lib/types"

interface PropertyGridProps {
  properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600">
            We're currently updating our property listings. Please check back soon or contact us for more information.
          </p>
        </div>
      </div>
    )
  }

  // Enhanced grid with better spacing - max 3 cards per row with generous gaps
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16 xl:gap-20 max-w-7xl mx-auto">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
