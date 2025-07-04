export interface Property {
  id: string
  name: string
  category: "residential" | "commercial" // New field
  type: string // "Apartment" | "Villa" | "Office" | "Retail" | "Warehouse" | "Food Court"

  // Residential specific
  bhk?: number

  // Commercial specific - Enhanced for detailed pricing
  suitableFor?: string[] // ["Office", "Retail", "Restaurant", "Clinic"]
  floorDetails?: string
  parkingSpaces?: number
  pricePerSqft?: string

  // Enhanced commercial pricing structure
  officeSize?: string
  showroomSize?: string
  officePrice?: string
  showroomPrice?: string
  developer?: string

  // Common fields
  price: string
  priceUnit: string
  priceDescription?: string
  image: string
  heroImage?: string
  location: string
  possession?: string
  size: string
  superBuiltUpArea?: string
  block?: string
  label?: string
  description: string
  amenities: string[]
  gallery: string[]
  rera?: string
  companyLogo?: string
  plans?: {
    master?: string
    floor?: string
    costing?: string
  }
}

export interface FormData {
  fullName: string
  email: string
  phone: string
  message?: string
  project?: string
  budget?: string
  visitDate?: string
  visitTime?: string
}

export interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  message?: string
  project?: string
  budget?: string
  visitDate?: string
  visitTime?: string
}

export interface FormState {
  data: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  submitError?: string
}
