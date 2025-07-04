import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-gray-light pt-12 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Address: B 1102, GANESH GLORY, 11, Jagatpur Rd, off Sarkhej - Gandhinagar Highway, Gota, Ahmedabad, Gujarat
            382470
          </p>
          <div className="flex justify-center space-x-8 mt-6">
            <div className="flex items-center p-3 bg-gradient-white-soft rounded-lg shadow-gray-soft border border-gray-200">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 mr-3">
                <Phone size={16} className="text-orange-700" />
              </div>
              <span className="text-sm font-medium text-gray-700">Phone</span>
            </div>
            <div className="flex items-center p-3 bg-gradient-white-soft rounded-lg shadow-gray-soft border border-gray-200">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-full p-2 mr-3">
                <Mail size={16} className="text-orange-700" />
              </div>
              <span className="text-sm font-medium text-gray-700">Email</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-8">
          <p className="mb-2 font-semibold text-gray-700">
            THIS WEBSITE IS MANAGED BY SHELTER4U GLOBAL REALTY PRIVATE LIMITED
          </p>
          <p className="mb-2 font-medium text-orange-700">
            RERA NO: AGUGI/AHMEDABAD/AHMEDABAD CITY/AUDA/RAA/145/270520/R1
          </p>
          <p className="mb-6 max-w-4xl mx-auto leading-relaxed text-gray-600">
            DISCLAIMER: This is not an official website of ADANI REALTY. We at SHELTER4U GLOBAL REALTY PRIVATE LIMITED
            are an authorized channel partner appointed by Adani Realty. The information provided on this website is
            collected from various sources and is provided solely for informational purposes. It does not constitute an
            offer or contract, nor should any information contained herein be relied upon as the basis for any contract
            or commitment. We reserve the right to update layout plans specific to individual units, buildings, or
            wings, which will be outlined in the application form. The sale is subject to terms and the Agreement for
            Sale. By registering your details with us, you acknowledge and consent to receive calls, SMS, or emails from
            our team regarding the project.
          </p>
          <div className="flex justify-center space-x-6 text-orange-600">
            <Link href="/about-us" className="hover:text-orange-700 transition-colors font-medium">
              About Us
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/privacy-policy" className="hover:text-orange-700 transition-colors font-medium">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms-conditions" className="hover:text-orange-700 transition-colors font-medium">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
