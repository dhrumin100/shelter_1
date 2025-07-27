"use client"

import Link from "next/link"

export default function TestThankYouPage() {
    const testData = {
        type: 'enquiry',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        property: 'Nila Vida',
        message: 'I am interested in this property. Please contact me.'
    }

    const params = new URLSearchParams(testData)
    const thankYouUrl = `/thank-you?${params.toString()}`

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Thank You Page</h1>
                <p className="text-gray-600 mb-6">
                    Click the button below to test the thank you page with sample data.
                </p>

                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Test Data:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><strong>Type:</strong> {testData.type}</li>
                            <li><strong>Name:</strong> {testData.name}</li>
                            <li><strong>Email:</strong> {testData.email}</li>
                            <li><strong>Phone:</strong> {testData.phone}</li>
                            <li><strong>Property:</strong> {testData.property}</li>
                            <li><strong>Message:</strong> {testData.message}</li>
                        </ul>
                    </div>

                    <Link
                        href={thankYouUrl}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
                    >
                        Test Thank You Page
                    </Link>

                    <Link
                        href="/"
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
} 