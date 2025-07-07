import type React from "react"
import {
  Dumbbell,
  Waves,
  Flower2,
  Building2,
  Users,
  UserMinus,
  Car,
  Shield,
  Zap,
  Wifi,
  Trees,
  Gamepad2,
  Coffee,
  ShoppingBag,
  Camera,
  Wind,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export default function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Enhanced map of amenity names to their icons
  const amenityIcons: Record<string, React.ReactNode> = {
    Gym: <Dumbbell className="h-6 w-6 text-orange-600" />,
    "Swimming Pool": <Waves className="h-6 w-6 text-orange-600" />,
    Garden: <Flower2 className="h-6 w-6 text-orange-600" />,
    Clubhouse: <Building2 className="h-6 w-6 text-orange-600" />,
    "Children's Play Area": <Users className="h-6 w-6 text-orange-600" />,
    "Senior Citizen Sit-out": <UserMinus className="h-6 w-6 text-orange-600" />,
    Parking: <Car className="h-6 w-6 text-orange-600" />,
    "24/7 Security": <Shield className="h-6 w-6 text-orange-600" />,
    "Power Backup": <Zap className="h-6 w-6 text-orange-600" />,
    "High Speed Internet": <Wifi className="h-6 w-6 text-orange-600" />,
    "Landscaped Gardens": <Trees className="h-6 w-6 text-orange-600" />,
    "Indoor Games": <Gamepad2 className="h-6 w-6 text-orange-600" />,
    Cafeteria: <Coffee className="h-6 w-6 text-orange-600" />,
    "Shopping Center": <ShoppingBag className="h-6 w-6 text-orange-600" />,
    "CCTV Surveillance": <Camera className="h-6 w-6 text-orange-600" />,
    "Central AC": <Wind className="h-6 w-6 text-orange-600" />,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-orange-50 border border-gray-200 rounded-xl hover:shadow-orange-soft transition-all duration-300 hover:border-orange-200 group"
        >
          <div className="mr-4 p-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
            {amenityIcons[amenity] || <div className="h-6 w-6 bg-orange-500 rounded-full" />}
          </div>
          <span className="text-sm font-medium text-gray-800 group-hover:text-orange-700 transition-colors">
            {amenity}
          </span>
        </div>
      ))}
    </div>
  )
}
