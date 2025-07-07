import Image from "next/image"
import { notFound } from "next/navigation"
import { getPropertyById } from "@/lib/data"
import PropertyGallery from "@/components/PropertyGallery"
import PropertyAmenities from "@/components/PropertyAmenities"
import PropertyOverview from "@/components/PropertyOverview"
import ContactForm from "@/components/ContactForm"
import PropertyPlans from "@/components/PropertyPlans"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <>
      {/* Top Bar/Header */}
      <div className="w-full bg-orange-50 shadow-sm py-4 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{property.name}</h1>
          <p className="text-base text-gray-700">{property.location || "Gift City Gujarat"}</p>
        </div>
      </div>

      {/* Hero Image - Clean, no overlays */}
      <div className="relative h-[400px] w-full">
        <Image src={property.heroImage || property.image} alt={property.name} fill priority className="object-cover rounded-none" />
      </div>

      {/* Essential Info Section (Price, BHK, Area, Possession, etc.) */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-orange-50 border rounded-lg">
            <span className="text-xs text-gray-500 mb-1">Price</span>
            <span className="text-lg font-bold text-orange-600">₹{property.price} {property.priceUnit}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-orange-50 border rounded-lg">
            <span className="text-xs text-gray-500 mb-1">Carpet Area</span>
            <span className="text-lg font-bold text-gray-800">{property.size} sqft</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-orange-50 border rounded-lg">
            <span className="text-xs text-gray-500 mb-1">Type</span>
            <span className="text-lg font-bold text-gray-800">{property.bhk} BHK</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-orange-50 border rounded-lg">
            <span className="text-xs text-gray-500 mb-1">Possession</span>
            <span className="text-lg font-bold text-gray-800">{property.possession || "Ready"}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-orange-50 border rounded-lg">
            <span className="text-xs text-gray-500 mb-1">Location</span>
            <span className="text-lg font-bold text-gray-800">{property.location || "Gift City Gujarat"}</span>
          </div>
        </div>
      </div>

      {/* Property Overview and other sections */}
      <div className="container mx-auto px-4 py-12">
        <PropertyOverview property={property} />

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-8">Amenities</h2>
          <PropertyAmenities amenities={property.amenities} />
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-8">Gallery</h2>
          <PropertyGallery images={property.gallery} />
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-8">Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700">{property.description}</p>
          </div>
        </section>

        <PropertyPlans property={property} />
      </div>

      <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Contact Team</h2>
            <div className="mb-6">
              <p className="font-medium">Priya</p>
              <p className="text-sm text-gray-600">Sales Manager</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">Fill out the form below and we'll get back to you shortly.</p>
            <ContactForm propertyName={property.name} />
          </div>
        </div>
      </section>
    </>
  )
}
