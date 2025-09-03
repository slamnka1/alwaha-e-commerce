import axios from 'axios'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import type { ApiError } from '@/@types'

export const handleFormError = <T extends FieldValues>(
  error: unknown,
  form: UseFormReturn<T>
) => {
  if (axios.isAxiosError(error) && error.response?.status) {
    const responseError = error.response.data as ApiError

    form.setError('root', { message: responseError.message })

    if (responseError.errors) {
      for (const key in responseError.errors) {
        form.setError(key as unknown as Path<T>, {
          message:
            responseError.errors![key as keyof typeof responseError.errors]![0],
          type: 'custom',
        })
      }
    }

    return
  }
  form.setError('root', { message: 'Unknown error' })
}
