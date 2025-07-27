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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await res.json();

      if (result.success) {
        // Only open WhatsApp after successful API submission
        const phoneNumber = "9714512452";
        const message = `Contact Request:\nName: ${payload.fullName}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nMessage: ${payload.message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        // Redirect to thank you page with form data
        const params = new URLSearchParams({
          type: 'contact',
          name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          property: '',
          message: payload.message || ''
        });
        window.location.href = `/thank-you?${params.toString()}`;
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      console.error(err);
    }
  }

  return (
    <section className="bg-gradient-orange-light py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-orange-800 to-orange-900 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          <p className="text-center text-gray-700 mb-8 md:mb-12 text-base md:text-lg px-4">
            Want to know more about Gift City Gujarat? Contact our expert team for detailed information about the
            project.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start p-4 md:p-6 bg-orange-solid rounded-xl md:rounded-2xl shadow-orange-soft border border-orange-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <Phone className="text-orange-700 h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">Phone</h3>
                  <p className="text-gray-600 text-sm md:text-base">9714512452</p>
                </div>
              </div>

              <div className="flex items-start p-4 md:p-6 bg-orange-solid rounded-xl md:rounded-2xl shadow-orange-soft border border-orange-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <Mail className="text-orange-700 h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">Email</h3>
                  <p className="text-gray-600 text-sm md:text-base">info@shelter4u.in</p>
                </div>
              </div>

              <div className="flex items-start p-4 md:p-6 bg-orange-solid rounded-xl md:rounded-2xl shadow-orange-soft border border-orange-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <MapPin className="text-orange-700 h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">Location</h3>
                  <p className="text-gray-600 text-sm md:text-base">B 1102, GANESH GLORY, 11, Jagatpur Rd, Gota, Ahmedabad</p>
                </div>
              </div>

              <div className="flex items-start p-4 md:p-6 bg-orange-solid rounded-xl md:rounded-2xl shadow-orange-soft border border-orange-200">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <Clock className="text-orange-700 h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg">Working Hours</h3>
                  <p className="text-gray-600 text-sm md:text-base">Mon - Sat: 10:00 AM - 06:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-solid p-6 md:p-8 rounded-xl md:rounded-2xl shadow-orange-soft border border-orange-200">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-sm md:text-base"
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
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-sm md:text-base"
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
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-sm md:text-base"
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
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white resize-none text-sm md:text-base"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-orange-warm hover:bg-gradient-orange-dark text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-300 shadow-orange-soft hover:shadow-orange-medium transform hover:scale-[1.02] text-sm md:text-base"
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
