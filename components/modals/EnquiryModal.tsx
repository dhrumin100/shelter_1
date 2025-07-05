"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, User, Mail, Phone, Send, CheckCircle } from "lucide-react"
import type { Property } from "@/lib/types"
import { useForm } from "@/hooks/useForm"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import LoadingSpinner from "../ui/LoadingSpinner"

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

export default function EnquiryModal({ isOpen, onClose, property }: EnquiryModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { sendFormData } = useWhatsApp()

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSubmit = async (data: any) => {
    const enquiryData = {
      ...data,
      propertyName: property.name,
      propertyCategory: property.category,
      formType: 'enquiry',
    };
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      // Only after successful API call, open WhatsApp
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9714512452";
      const message = `Enquiry:\nName: ${enquiryData.fullName}\nEmail: ${enquiryData.email}\nPhone: ${enquiryData.phone}\nProperty: ${enquiryData.propertyName}\nCategory: ${enquiryData.propertyCategory}\nMessage: ${enquiryData.message}`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    } catch (err) {
      alert('Submission failed. Please try again.');
      console.error(err);
    }
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
    initialData: { message: `I'm interested in ${property.name}` },
    onSubmit: handleSubmit,
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
      reset()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? "opacity-50" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl">
            {/* Left Side - Property Image and Details */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
              {/* Property Image */}
              <div className="relative h-48 lg:h-64 w-full rounded-xl overflow-hidden mb-6 shadow-lg">
                <Image
                  src={property.image || "/placeholder.svg?height=300&width=400"}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-orange-500 mb-1">{property.name}</h3>
                  <p className="text-gray-600 font-medium">
                    {property.bhk} BHK In {property.location}
                  </p>
                </div>

                {/* Company Logo */}
                <div className="flex justify-center py-2">
                  <div className="relative h-10 w-20 bg-white rounded-lg p-2 shadow-sm">
                    <Image
                      src="/placeholder.svg?height=40&width=80"
                      alt="Developer Logo"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-lg font-semibold text-gray-800 mb-1">{property.bhk} BHK Starts From</p>
                  <p className="text-2xl font-bold text-orange-500">
                    ₹{property.price} {property.priceUnit}
                  </p>
                  <p className="text-sm text-gray-600">{property.priceDescription}</p>
                </div>

                {/* Quick Details */}
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-orange-100 rounded-full p-1.5 mr-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-sm" />
                    </div>
                    <span>
                      Size: {property.size} sqft. ({property.superBuiltUpArea} Carpet Area)
                    </span>
                  </div>
                  <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                    <div className="bg-orange-100 rounded-full p-1.5 mr-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    </div>
                    <span>Possession: {property.possession}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Enquiry Form */}
            <div className="p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-700 mb-6">
                    Your enquiry has been submitted successfully. Our team will contact you soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquire about {property.name}</h2>
                    <p className="text-gray-600">Fill the form below and our team will contact you soon.</p>
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-4">
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                        placeholder="Full Name"
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                        placeholder="Email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={data.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                          }`}
                        placeholder="Phone"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Enquiry
                        </>
                      )}
                    </button>

                    {/* Trust Indicator */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      🔒 Your information is secure and will not be shared with third parties
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
