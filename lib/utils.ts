import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ""))
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

// WhatsApp utility
export const sendToWhatsApp = (phoneNumber: string, message: string): void => {
  try {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  } catch (error) {
    console.error("Error opening WhatsApp:", error)
    // Fallback: copy to clipboard
    navigator.clipboard?.writeText(message).catch(() => {
      alert("Unable to open WhatsApp. Please contact us directly.")
    })
  }
}

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Format price utility
export const formatPrice = (price: string, unit: string): string => {
  if (price === "Price On Request") return price
  return `₹${price} ${unit}`
}

// Error logging utility
export const logError = (error: Error, context: string): void => {
  console.error(`Error in ${context}:`, error)
  // In production, send to error tracking service
}
