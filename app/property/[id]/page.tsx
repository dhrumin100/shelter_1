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
      <div className="relative h-[500px] w-full">
        <Image src={property.heroImage || property.image} alt={property.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{property.name}</h1>
            <p className="text-xl text-white/90 mb-4">{property.bhk} BHK in Gift City Gujarat</p>
            <p className="text-2xl font-bold text-white mb-6">
              ₹{property.price} {property.priceUnit} {property.priceDescription || "Onwards All Inclusive"}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded transition-colors">
              Request Brochure
            </button>
          </div>
        </div>
      </div>

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
