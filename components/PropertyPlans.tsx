"use client"
import Image from "next/image"
import type { Property } from "@/lib/types"

interface PropertyPlansProps {
  property: Property
}

export default function PropertyPlans({ property }: PropertyPlansProps) {
  const plans = [
    {
      id: "master",
      title: "Master Plan",
      image: "/placeholder.svg?height=300&width=400",
      whatsappMessage: `Hi, I'm interested in ${property.name} at Gift City Gujarat. Please send me the Master Plan for this ${property.bhk} BHK ${property.type}. 

Property Details:
- Name: ${property.name}
- Type: ${property.bhk} BHK ${property.type}
- Price: ${property.price} ${property.priceUnit}
- Size: ${property.size}${property.type === "Villa" ? " sq. yard" : " sqft"}
- Location: ${property.location}

Thank you!`,
    },
    {
      id: "floor",
      title: "Floor Plan",
      image: "/placeholder.svg?height=300&width=400",
      whatsappMessage: `Hi, I'm interested in ${property.name} at Gift City Gujarat. Please send me the Floor Plan for this ${property.bhk} BHK ${property.type}.

Property Details:
- Name: ${property.name}
- Type: ${property.bhk} BHK ${property.type}
- Price: ${property.price} ${property.priceUnit}
- Size: ${property.size}${property.type === "Villa" ? " sq. yard" : " sqft"}
- Location: ${property.location}

Thank you!`,
    },
    {
      id: "costing",
      title: "Costing Details",
      image: "/placeholder.svg?height=300&width=400",
      whatsappMessage: `Hi, I'm interested in ${property.name} at Gift City Gujarat. Please send me the detailed Costing Information for this ${property.bhk} BHK ${property.type}.

Property Details:
- Name: ${property.name}
- Type: ${property.bhk} BHK ${property.type}
- Price: ${property.price} ${property.priceUnit}
- Size: ${property.size}${property.type === "Villa" ? " sq. yard" : " sqft"}
- Location: ${property.location}

I would like to know about:
- Complete pricing breakdown
- Payment plans available
- Additional charges if any
- Booking process

Thank you!`,
    },
  ]

  const sendToWhatsApp = (message: string) => {
    const phoneNumber = "9714512452"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-8">Download Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image src={plan.image || "/placeholder.svg"} alt={plan.title} fill className="object-cover" />

              {/* Overlay with document icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-orange-50 rounded-full p-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#FF6600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="14,2 14,8 20,8"
                      stroke="#FF6600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="13"
                      x2="8"
                      y2="13"
                      stroke="#FF6600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="17"
                      x2="8"
                      y2="17"
                      stroke="#FF6600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="10,9 9,9 8,9"
                      stroke="#FF6600"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-4 text-center">
              <h3 className="font-bold text-lg mb-2 text-gray-800">{plan.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get detailed {plan.title.toLowerCase()} for {property.name}
              </p>
              <button
                onClick={() => sendToWhatsApp(plan.whatsappMessage)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M17.472 14.382C17.367 14.382 17.261 14.329 17.186 14.254L15.108 12.176C14.957 12.025 14.957 11.779 15.108 11.628C15.259 11.477 15.505 11.477 15.656 11.628L17.734 13.706C17.885 13.857 17.885 14.103 17.734 14.254C17.659 14.329 17.553 14.382 17.472 14.382Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 21C10.758 21 9.589 20.764 8.516 20.292C6.370 19.348 4.652 17.630 3.708 15.484C2.764 13.338 2.764 10.662 3.708 8.516C4.652 6.370 6.370 4.652 8.516 3.708C10.662 2.764 13.338 2.764 15.484 3.708C17.630 4.652 19.348 6.370 20.292 8.516C20.764 9.589 21 10.758 21 12C21 16.971 16.971 21 12 21ZM12 4C7.589 4 4 7.589 4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4Z"
                    fill="currentColor"
                  />
                </svg>
                Get {plan.title} On WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-orange-solid rounded-lg p-6">
        <div className="flex items-start">
          <div className="bg-orange-100 rounded-full p-2 mr-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#FF6600" strokeWidth="2" />
              <path d="M12 6V12L16 14" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Quick Response Guarantee</h4>
            <p className="text-sm text-gray-600">
              Our team will respond to your plan request within 30 minutes during business hours (10 AM - 6 PM,
              Mon-Sat). All plans are sent as high-quality PDF documents via WhatsApp for your convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
