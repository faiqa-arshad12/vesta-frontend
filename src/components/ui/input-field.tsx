"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  labelClassName?: string
  containerClassName?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, labelClassName, containerClassName, className, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className={cn("w-full space-y-2", containerClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-foreground",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            "bg-white dark:bg-input/30",
            "border-input",
            "rounded-lg",
            "h-auto py-3 px-4",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

InputField.displayName = "InputField"

export { InputField }

