import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-orange-200 bg-orange-solid py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-4">
            Address: B 1102, GANESH GLORY, 11, Jagatpur Rd, off Sarkhej - Gandhinagar Highway, Gota, Ahmedabad, Gujarat
            382470
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-8 mt-4 md:mt-6">
            <div className="flex items-center justify-center p-2 md:p-3 bg-gradient-white-soft rounded-lg shadow-gray-soft border border-gray-200">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-1.5 md:p-2 mr-2 md:mr-3">
                <Phone size={14} className="md:w-4 md:h-4 text-orange-700" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700">Phone</span>
            </div>
            <div className="flex items-center justify-center p-2 md:p-3 bg-gradient-white-soft rounded-lg shadow-gray-soft border border-gray-200">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-1.5 md:p-2 mr-2 md:mr-3">
                <Mail size={14} className="md:w-4 md:h-4 text-orange-700" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700">Email</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6 md:mt-8">
          <p className="mb-2 font-semibold text-gray-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
            From Gift City Gujarat
          </p>
          <p className="mb-2 font-medium text-orange-700 text-xs md:text-sm">
            RERA NO: AGUGI/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA/145/270520/R1
          </p>
          <p className="mb-2 font-medium text-gray-700 text-xs md:text-sm">
            The authorised channel partner Shelter4U.
          </p>
          <p className="mb-4 md:mb-6 max-w-4xl mx-auto leading-relaxed text-gray-700 text-xs md:text-sm px-4">
            DISCLAIMER: This is not an official website of any developer. The information provided on this website is collected from various sources and is provided solely for informational purposes. It does not constitute an offer or contract, nor should any information contained herein be relied upon as the basis for any contract or commitment. We reserve the right to update layout plans specific to individual units, buildings, or wings, which will be outlined in the application form. The sale is subject to terms and the Agreement for Sale. By registering your details with us, you acknowledge and consent to receive calls, SMS, or emails from our team regarding the project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-orange-600">
            <Link href="/about-us" className="hover:text-orange-700 transition-colors font-medium text-xs md:text-sm">
              About Us
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="/privacy-policy" className="hover:text-orange-700 transition-colors font-medium text-xs md:text-sm">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="/terms-conditions" className="hover:text-orange-700 transition-colors font-medium text-xs md:text-sm">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
