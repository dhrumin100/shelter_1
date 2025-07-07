"use client"

import type React from "react"

import { useState } from "react"

interface ContactFormProps {
  propertyName?: string
  property?: any
}

export default function ContactForm({ propertyName, property = {} }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: propertyName ? `I'm interested in ${propertyName}` : "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      formType: "contact",
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      propertyCategory: property.category || "",
      project: propertyName || "",
      budget: "",
      message: formData.message,
      propertyName: property.name || propertyName || "",
    };
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await res.json();

      if (result.success) {
        // Only open WhatsApp after successful API submission
        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9714512452";
        const message = `Contact:\nName: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nProperty: ${payload.propertyName}\nCategory: ${payload.propertyCategory}\nMessage: ${payload.message}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      console.error(err);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank you for your submission!</h3>
        <button onClick={() => setSubmitted(false)} className="text-green-600 hover:text-green-800 font-medium text-sm underline mt-4">
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-orange-solid p-6 rounded-lg shadow-md border border-orange-200">
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
