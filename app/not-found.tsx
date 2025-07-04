import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <h2 className="text-2xl font-medium mt-4 mb-6">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
