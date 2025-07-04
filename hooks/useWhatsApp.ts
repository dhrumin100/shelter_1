"use client"

import { useCallback } from "react"
import { sendToWhatsApp, logError } from "@/lib/utils"

interface UseWhatsAppOptions {
  phoneNumber?: string
  onError?: (error: Error) => void
}

export const useWhatsApp = ({ phoneNumber = "9714512452", onError }: UseWhatsAppOptions = {}) => {
  const sendMessage = useCallback(
    (message: string) => {
      try {
        sendToWhatsApp(phoneNumber, message)
      } catch (error) {
        const err = error instanceof Error ? error : new Error("WhatsApp error")
        logError(err, "WhatsApp integration")
        onError?.(err)
      }
    },
    [phoneNumber, onError],
  )

  const sendPropertyEnquiry = useCallback(
    (propertyName: string, additionalInfo?: string) => {
      const message = `Hi, I'm interested in ${propertyName} at Adani Shantigram.${additionalInfo ? ` ${additionalInfo}` : ""}`
      sendMessage(message)
    },
    [sendMessage],
  )

  const sendFormData = useCallback(
    (formData: any, formType: string) => {
      const message = `${formType}:
${Object.entries(formData)
  .filter(([_, value]) => value)
  .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
  .join("\n")}`

      sendMessage(message)
    },
    [sendMessage],
  )

  return {
    sendMessage,
    sendPropertyEnquiry,
    sendFormData,
  }
}
