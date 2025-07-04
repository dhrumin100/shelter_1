"use client"

import React from "react"
import { logError } from "@/lib/utils"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, `ErrorBoundary: ${errorInfo.componentStack}`)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error}
          reset={() => this.setState({ hasError: false, error: undefined })}
        />
      )
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error?.message || "An unexpected error occurred. Please try again."}</p>
      <button
        onClick={reset}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
