"use client"

import type React from "react"

import { useState } from "react"

interface ContactFormProps {
  propertyName?: string
}

export default function ContactForm({ propertyName }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: propertyName ? `I'm interested in ${propertyName}` : "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Send to WhatsApp with updated number
    const phoneNumber = "9714512452"
    const message = `Contact Request:
Property: ${propertyName || "Not specified"}
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: propertyName ? `I'm interested in ${propertyName}` : "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Tell us about your requirements..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
