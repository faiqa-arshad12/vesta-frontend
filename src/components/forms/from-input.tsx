"use client";

import {useState} from "react";
import {FieldPath, FieldValues} from "react-hook-form";
import {Eye, EyeOff} from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {BaseFormFieldProps} from "@/types/base-form";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  inputClassName?: string;
}

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  required,
  type = "text",
  placeholder,
  step,
  min,
  max,
  disabled,
  className,
  inputClassName,
}: FormInputProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-[22px] font-medium text-secondary aria-invalid:text-destructive">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                type={inputType}
                placeholder={placeholder}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  if (type === "number") {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseFloat(value)
                    );
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                className={`bg-white border-input h-[42px] w-full rounded-[8px] placeholder:text-secondary placeholder:text-[16px] ${
                  isPasswordType ? "pr-10" : ""
                } ${inputClassName || ""}`}
              />
              {isPasswordType && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
                  disabled={disabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export {FormInput};
