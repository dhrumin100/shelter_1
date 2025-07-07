"use client"

import type React from "react"
import { useForm } from "@/hooks/useForm"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import type { FormData } from "@/lib/types"
import LoadingSpinner from "../ui/LoadingSpinner"
import {
  AlertCircle,
  CheckCircle,
  Calendar,
  User,
  Mail,
  Phone,
  Home,
  IndianRupee,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UniversalFormProps {
  type: "contact" | "booking" | "enquiry"
  propertyName?: string
  property?: any
  title?: string
  description?: string
  className?: string
  onSuccess?: () => void
}

export default function UniversalForm({
  type,
  propertyName,
  property = {},
  title,
  description,
  className = "",
  onSuccess,
}: UniversalFormProps) {
  const { sendFormData } = useWhatsApp()

  const handleSubmit = async (data: FormData) => {
    const payload = {
      formType: type,
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      propertyCategory: property.category || data.propertyCategory || "",
      project: data.project || propertyName || "",
      budget: data.budget || "",
      message: data.message || "",
      propertyName: property.name || propertyName || "",
    };
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');
      // Only after successful API call, open WhatsApp
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9714512452";
      const message = `${type === "enquiry" ? "Enquiry" : "Contact"}:\nName: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nProperty: ${payload.propertyName}\nCategory: ${payload.propertyCategory}\nMessage: ${payload.message}`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
      onSuccess?.();
    } catch (err) {
      alert('Submission failed. Please try again.');
      console.error(err);
    }
  }

  const customValidate = (data: FormData) => {
    const errors: any = {}
    if (type === "booking") {
      if (!data.propertyCategory)
        errors.propertyCategory = "Please select a property type"
      if (!data.project) errors.project = "Please select a BHK or type"
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
    initialData: propertyName
      ? { message: `I'm interested in ${propertyName}` }
      : {},
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
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 md:p-6 max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">Thank you for your submission!</h3>
          <button onClick={reset} className="text-green-600 hover:text-green-800 font-medium text-sm underline mt-4">
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className={cn(
        "w-full max-w-xl mx-auto rounded-2xl p-6 md:p-8",
        className
      )}
      onSubmit={handleFormSubmit}
      noValidate
    >
      {/* Header */}
      <div className="text-center mb-2 md:mb-3">
        {title && (
          <>
            <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-1 flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              {title}
            </h3>
            <div className="w-12 h-1 bg-orange-300 rounded mx-auto mb-2" />
          </>
        )}
        {description && (
          <p className="text-gray-600 text-xs md:text-sm mb-1">{description}</p>
        )}
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 md:p-3 mb-2 md:mb-3 flex items-start">
          <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
          <p className="text-red-700 text-xs md:text-sm">{submitError}</p>
        </div>
      )}

      {/* Fields */}
      <div className="space-y-3 md:space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
          >
            <User className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-base bg-orange-50 ${errors.fullName
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
              }`}
            placeholder="Enter your name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="text-red-600 text-xs mt-1 ml-1">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
          >
            <Mail className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-base bg-orange-50 ${errors.email
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
              }`}
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1 ml-1">{errors.email}</p>
          )}
        </div>

        {/* Phone & Property Category Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
            >
              <Phone className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={data.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-base bg-orange-50 ${errors.phone
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
                }`}
              placeholder="Enter your phone"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1 ml-1">{errors.phone}</p>
            )}
          </div>

          {/* Property Category */}
          <div>
            <label
              htmlFor="propertyCategory"
              className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
            >
              <Home className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
              Property Category
            </label>
            <select
              id="propertyCategory"
              value={data.propertyCategory || ""}
              onChange={(e) => {
                updateField("propertyCategory", e.target.value)
                updateField("project", "")
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none bg-orange-50 text-base ${errors.propertyCategory
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
                }`}
              aria-invalid={!!errors.propertyCategory}
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {errors.propertyCategory && (
              <p className="text-red-600 text-xs mt-1 ml-1">
                {errors.propertyCategory}
              </p>
            )}
          </div>
        </div>

        {/* Commercial Type & Budget Range Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Commercial Type */}
          <div>
            <label
              htmlFor="project"
              className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
            >
              {data.propertyCategory === "Residential"
                ? "BHK Type"
                : "Commercial Type"}
            </label>
            <select
              id="project"
              value={data.project || ""}
              onChange={(e) => updateField("project", e.target.value)}
              className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none bg-orange-50 text-sm md:text-base ${errors.project
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
                }`}
              aria-invalid={!!errors.project}
            >
              <option value="">
                {data.propertyCategory === "Residential"
                  ? "Select BHK type"
                  : "Select type"}
              </option>
              {data.propertyCategory === "Residential" && (
                <>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Villa">Villa</option>
                </>
              )}
              {data.propertyCategory === "Commercial" && (
                <>
                  <option value="Office">Office</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Retail">Retail</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Food Court">Food Court</option>
                </>
              )}
            </select>
            {errors.project && (
              <p className="text-red-600 text-xs mt-1 ml-1">
                {errors.project}
              </p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2"
            >
              <IndianRupee className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
              Budget Range
            </label>
            <select
              id="budget"
              value={data.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={`w-full px-3 md:px-4 py-2 md:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none bg-orange-50 text-sm md:text-base ${errors.budget
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
                }`}
              aria-invalid={!!errors.budget}
            >
              <option value="">Select budget</option>
              <option value="50 Lakh - 1 Cr">₹50 Lakh - ₹1 Cr</option>
              <option value="1 Cr - 1.5 Cr">₹1 Cr - ₹1.5 Cr</option>
              <option value="1.5 Cr - 2 Cr">₹1.5 Cr - ₹2 Cr</option>
              <option value="2 Cr - 3 Cr">₹2 Cr - ₹3 Cr</option>
              <option value="3 Cr - 4 Cr">₹3 Cr - ₹4 Cr</option>
              <option value="4 Cr - 5 Cr">₹4 Cr - ₹5 Cr</option>
              <option value="5 Cr+">₹5 Cr+</option>
            </select>
            {errors.budget && (
              <p className="text-red-600 text-xs mt-1 ml-1">
                {errors.budget}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-3 md:py-4 rounded-lg transition transform disabled:scale-100 flex items-center justify-center text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-1" /> Sending...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-1" />
              Book Visit
            </>
          )}
        </button>

        {/* Secure note */}
        {type === "booking" && (
          <p className="text-xs text-gray-500 text-center pt-1">
            🔒 Your information is secure
          </p>
        )}
      </div>
    </form>
  )
}
