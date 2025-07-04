import { LayoutGrid, Home, CalendarClock, Building, Square, CreditCard } from "lucide-react"
import type { Property } from "@/lib/types"

interface PropertyOverviewProps {
  property: Property
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  const overviewItems = [
    {
      icon: <LayoutGrid className="h-6 w-6 text-orange-500" />,
      title: "20+ Amenities",
    },
    {
      icon: <Home className="h-6 w-6 text-orange-500" />,
      title: "Home Automation",
    },
    {
      icon: <Building className="h-6 w-6 text-orange-500" />,
      title: `Bedroom: ${property.bhk}`,
    },
    {
      icon: <Square className="h-6 w-6 text-orange-500" />,
      title: `Size: ${property.size} Sq. Ft (Carpet Area), ${property.superBuiltUpArea || "112"} SQM`,
    },
    {
      icon: <Building className="h-6 w-6 text-orange-500" />,
      title: `Block: ${property.block || "11"}`,
    },
    {
      icon: <CalendarClock className="h-6 w-6 text-orange-500" />,
      title: `Possession: ${property.possession || "2025"}`,
    },
    {
      icon: <CreditCard className="h-6 w-6 text-orange-500" />,
      title: "Payment Plan: EMI Available",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-orange-500" />,
      title: property.rera ? `RERA: ${property.rera}` : "RERA Approved",
    },
  ]

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-8">Overview</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {overviewItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg">
            {item.icon}
            <span className="mt-2 text-sm text-center">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
