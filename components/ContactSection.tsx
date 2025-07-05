"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })

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
      message: formData.message,
      propertyName: "", // No property for general contact
    };
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit');
      // Only after successful API call, open WhatsApp
      const phoneNumber = "9714512452";
      const message = `Contact Request:\nName: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nMessage: ${payload.message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert('Submission failed. Please try again.');
      console.error(err);
    }
  }

  return (
    <section className="bg-gradient-orange-light py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-700 mb-12 text-lg">
            Want to know more about Adani Shantigram? Contact our expert team for detailed information about the
            project.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start p-6 bg-gradient-white-soft rounded-2xl shadow-gray-soft border border-gray-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-3 mr-4">
                  <Phone className="text-orange-700 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Phone</h3>
                  <p className="text-gray-600">9714512452</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-gradient-white-soft rounded-2xl shadow-gray-soft border border-gray-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-3 mr-4">
                  <Mail className="text-orange-700 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Email</h3>
                  <p className="text-gray-600">info@shelter4u.in</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-gradient-white-soft rounded-2xl shadow-gray-soft border border-gray-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-3 mr-4">
                  <MapPin className="text-orange-700 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Location</h3>
                  <p className="text-gray-600">B 1102, GANESH GLORY, 11, Jagatpur Rd, Gota, Ahmedabad</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-gradient-white-soft rounded-2xl shadow-gray-soft border border-gray-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-3 mr-4">
                  <Clock className="text-orange-700 h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Working Hours</h3>
                  <p className="text-gray-600">Mon - Sat: 10:00 AM - 06:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-white-soft p-8 rounded-2xl shadow-gray-soft border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-orange-warm hover:bg-gradient-orange-dark text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-orange-soft hover:shadow-orange-medium transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
