import { useFormContext } from "react-hook-form"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorMessageProps {
  className?: string
  message?: string
}

export function FormErrorMessage({
  className,
  message,
}: FormErrorMessageProps) {
  const { formState } = useFormContext()
  const { errors } = formState

  // If a specific message is provided, use it
  if (message) {
    return (
      <div
        className={cn(
          "border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
          className,
        )}
      >
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
    )
  }

  // Get the first error from the form
  const firstError = errors.root || Object.values(errors)[0]

  if (!firstError?.message) {
    return null
  }

  return (
    <div
      className={cn(
        "border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
        className,
      )}
    >
      <AlertCircle className="h-4 w-4" />
      <span>{String(firstError.message)}</span>
    </div>
  )
}
