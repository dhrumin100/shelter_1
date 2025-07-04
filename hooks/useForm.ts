"use client"

import { useState, useCallback } from "react"
import type { FormData, FormErrors, FormState } from "@/lib/types"
import { validateEmail, validatePhone, validateRequired } from "@/lib/utils"

interface UseFormOptions {
  initialData?: Partial<FormData>
  onSubmit: (data: FormData) => Promise<void>
  validate?: (data: FormData) => FormErrors
}

export const useForm = ({ initialData = {}, onSubmit, validate }: UseFormOptions) => {
  const [state, setState] = useState<FormState>({
    data: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      project: "",
      visitDate: "",
      visitTime: "",
      ...initialData,
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  })

  const validateForm = useCallback(
    (data: FormData): FormErrors => {
      const errors: FormErrors = {}

      if (!validateRequired(data.fullName)) {
        errors.fullName = "Full name is required"
      }

      if (!validateRequired(data.email)) {
        errors.email = "Email is required"
      } else if (!validateEmail(data.email)) {
        errors.email = "Please enter a valid email address"
      }

      if (!validateRequired(data.phone)) {
        errors.phone = "Phone number is required"
      } else if (!validatePhone(data.phone)) {
        errors.phone = "Please enter a valid 10-digit phone number"
      }

      // Custom validation if provided
      if (validate) {
        const customErrors = validate(data)
        Object.assign(errors, customErrors)
      }

      return errors
    },
    [validate],
  )

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined },
      submitError: undefined,
    }))
  }, [])

  const handleSubmit = useCallback(async () => {
    const errors = validateForm(state.data)

    if (Object.keys(errors).length > 0) {
      setState((prev) => ({ ...prev, errors }))
      return
    }

    setState((prev) => ({ ...prev, isSubmitting: true, errors: {}, submitError: undefined }))

    try {
      await onSubmit(state.data)
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        data: {
          fullName: "",
          email: "",
          phone: "",
          message: "",
          project: "",
          visitDate: "",
          visitTime: "",
          ...initialData,
        },
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        submitError: error instanceof Error ? error.message : "An error occurred. Please try again.",
      }))
    }
  }, [state.data, validateForm, onSubmit, initialData])

  const reset = useCallback(() => {
    setState({
      data: {
        fullName: "",
        email: "",
        phone: "",
        message: "",
        project: "",
        visitDate: "",
        visitTime: "",
        ...initialData,
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
    })
  }, [initialData])

  return {
    ...state,
    updateField,
    handleSubmit,
    reset,
  }
}
