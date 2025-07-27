"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    CheckCircle,
    Home,
    Phone,
    Mail,
    MapPin,
    ArrowLeft,
    Star,
    Heart,
    MessageCircle,
    Calendar,
    Clock
} from "lucide-react"

function ThankYouContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [formData, setFormData] = useState<any>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Get form data from URL params
        const formType = searchParams?.get('type') || 'contact'
        const fullName = searchParams?.get('name') || ''
        const email = searchParams?.get('email') || ''
        const phone = searchParams?.get('phone') || ''
        const propertyName = searchParams?.get('property') || ''
        const message = searchParams?.get('message') || ''

        setFormData({
            formType,
            fullName,
            email,
            phone,
            propertyName,
            message
        })

        // Animate in
        setTimeout(() => setIsVisible(true), 100)
    }, [searchParams])

    const getFormTypeInfo = (type: string) => {
        switch (type) {
            case 'enquiry':
                return {
                    title: 'Enquiry Submitted Successfully!',
                    subtitle: 'Thank you for your interest in our property. Our team will contact you within 24 hours.',
                    icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
                    color: 'orange'
                }
            case 'booking':
                return {
                    title: 'Booking Request Received!',
                    subtitle: 'We have received your booking request. Our team will confirm your appointment shortly.',
                    icon: <Calendar className="h-8 w-8 text-blue-600" />,
                    color: 'blue'
                }
            default:
                return {
                    title: 'Message Sent Successfully!',
                    subtitle: 'Thank you for contacting us. We will get back to you as soon as possible.',
                    icon: <Mail className="h-8 w-8 text-green-600" />,
                    color: 'green'
                }
        }
    }

    const formInfo = formData ? getFormTypeInfo(formData.formType) : getFormTypeInfo('contact')

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/logo.png"
                                alt="Gift City Gujarat"
                                width={48}
                                height={48}
                                className="rounded-lg"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Gift City Gujarat</h1>
                                <p className="text-sm text-gray-600">Shelter4U</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Success Card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-orange-200 overflow-hidden">

                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 md:p-12 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                                    <CheckCircle className="h-10 w-10 text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    {formInfo.title}
                                </h1>
                                <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto">
                                    {formInfo.subtitle}
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 opacity-20">
                                <Star className="h-8 w-8" />
                            </div>
                            <div className="absolute top-8 right-8 opacity-20">
                                <Heart className="h-6 w-6" />
                            </div>
                            <div className="absolute bottom-6 left-12 opacity-20">
                                <Star className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Form Details */}
                        {formData && (
                            <div className="p-6 md:p-8">
                                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        {formInfo.icon}
                                        Submission Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formData.fullName && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Name</p>
                                                <p className="text-gray-900 font-semibold">{formData.fullName}</p>
                                            </div>
                                        )}
                                        {formData.email && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Email</p>
                                                <p className="text-gray-900 font-semibold">{formData.email}</p>
                                            </div>
                                        )}
                                        {formData.phone && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Phone</p>
                                                <p className="text-gray-900 font-semibold">{formData.phone}</p>
                                            </div>
                                        )}
                                        {formData.propertyName && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Property</p>
                                                <p className="text-gray-900 font-semibold">{formData.propertyName}</p>
                                            </div>
                                        )}
                                        {formData.message && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm font-medium text-gray-600">Message</p>
                                                <p className="text-gray-900 font-semibold">{formData.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Next Steps */}
                        <div className="p-6 md:p-8 bg-gradient-to-r from-orange-50 to-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                What Happens Next?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
                                    <p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Personal Consultation</h4>
                                    <p className="text-sm text-gray-600">Schedule a call or site visit</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Follow Up</h4>
                                    <p className="text-sm text-gray-600">Regular updates on your enquiry</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <Home className="h-5 w-5" />
                            Back to Home
                        </Link>
                        <Link
                            href="/#contact"
                            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 hover:border-orange-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Contact Again
                        </Link>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg border border-orange-200 p-6 md:p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                            Need Immediate Assistance?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Call Us</p>
                                    <p className="text-sm text-gray-600">+91 9714512452</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Email Us</p>
                                    <p className="text-sm text-gray-600">info@shelter4u.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Visit Us</p>
                                    <p className="text-sm text-gray-600">Gift City, Gujarat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    )
} 