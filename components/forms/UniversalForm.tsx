"use client"

import type React from "react"
import { useForm } from "@/hooks/useForm"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import type { FormData } from "@/lib/types"
import LoadingSpinner from "../ui/LoadingSpinner"
import { AlertCircle, CheckCircle, Calendar, User, Mail, Phone, Home, DollarSign } from "lucide-react"

interface UniversalFormProps {
  type: "contact" | "booking" | "enquiry"
  propertyName?: string
  title?: string
  description?: string
  className?: string
  onSuccess?: () => void
}

export default function UniversalForm({
  type,
  propertyName,
  title,
  description,
  className = "",
  onSuccess,
}: UniversalFormProps) {
  const { sendFormData } = useWhatsApp()

  const handleSubmit = async (data: FormData) => {
    const formType =
      type === "booking" ? "Site Visit Request" : type === "enquiry" ? "Property Enquiry" : "Contact Request"

    const formDataWithProperty = propertyName ? { ...data, property: propertyName } : data

    sendFormData(formDataWithProperty, formType)
    onSuccess?.()
  }

  const customValidate = (data: FormData) => {
    const errors: any = {}

    if (type === "booking") {
      if (!data.project) errors.project = "Please select a property type"
      if (!data.budget) errors.budget = "Please select a budget range"
    }

    return errors
  }

  const {
    data,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
    updateField,
    handleSubmit: onSubmit,
    reset,
  } = useForm({
    initialData: propertyName ? { message: `I'm interested in ${propertyName}` } : {},
    onSubmit: handleSubmit,
    validate: customValidate,
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  if (isSubmitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 mb-4 text-sm">
            Your {type === "booking" ? "site visit request" : "message"} has been sent successfully. We'll contact you
            shortly.
          </p>
          <button onClick={reset} className="text-green-600 hover:text-green-800 font-medium text-sm underline">
            Send Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleFormSubmit} className={`${className}`} noValidate>
      {/* Header */}
      <div className="text-center mb-6">
        {title && (
          <h3 className="text-2xl font-bold text-orange-500 mb-2 flex items-center justify-center">
            <Calendar className="w-6 h-6 mr-2" />
            {title}
          </h3>
        )}
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start mb-4">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-700 text-sm">{submitError}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
              errors.fullName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter your name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
              errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
              errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter your phone"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
        </div>

        {type === "booking" && (
          <>
            {/* Property Type */}
            <div>
              <label htmlFor="project" className="block text-sm font-semibold text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-1" />
                Property Type
              </label>
              <select
                id="project"
                value={data.project}
                onChange={(e) => updateField("project", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white ${
                  errors.project ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                aria-invalid={!!errors.project}
              >
                <option value="">Select BHK type</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="Villa">Villa</option>
              </select>
              {errors.project && <p className="text-red-500 text-xs mt-1 ml-1">{errors.project}</p>}
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Budget Range
              </label>
              <select
                id="budget"
                value={data.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none bg-white ${
                  errors.budget ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                aria-invalid={!!errors.budget}
              >
                <option value="">Select budget</option>
                <option value="50 Lakhs - 1 Cr">50 Lakhs - 1 Cr</option>
                <option value="1 Cr - 1.5 Cr">1 Cr - 1.5 Cr</option>
                <option value="1.5 Cr - 2 Cr">1.5 Cr - 2 Cr</option>
                <option value="2 Cr - 3 Cr">2 Cr - 3 Cr</option>
                <option value="3 Cr - 4 Cr">2 Cr - 3 Cr</option>
                <option value="4 Cr - 5 Cr">2 Cr - 3 Cr</option>
                <option value="5 Cr+">5 Cr+</option>
              </select>
              {errors.budget && <p className="text-red-500 text-xs mt-1 ml-1">{errors.budget}</p>}
            </div>
          </>
        )}

        {type !== "booking" && (
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={data.message}
              onChange={(e) => updateField("message", e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                errors.message ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Tell us about your requirements..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Sending...
            </>
          ) : type === "booking" ? (
            <>
              <Calendar className="w-5 h-5 mr-2" />
              Book Site Visit
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {/* Trust Indicators */}
        {type === "booking" && (
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">🔒 Your information is secure and will not be shared</p>
          </div>
        )}
      </div>
    </form>
  )
}
