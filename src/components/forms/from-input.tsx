"use client";

import {FieldPath, FieldValues} from "react-hook-form";
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
            <Input
              type={type}
              placeholder={placeholder}
              step={step}
              min={min}
              max={max}
              disabled={disabled}
              {...field}
              onChange={(e) => {
                if (type === "number") {
                  const value = e.target.value;
                  field.onChange(value === "" ? undefined : parseFloat(value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              className={`bg-white border-input h-[42px] w-full  rounded-[8px] placeholder:text-secondary placeholder:text-[16px] ${
                inputClassName || ""
              }`}
            />
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
