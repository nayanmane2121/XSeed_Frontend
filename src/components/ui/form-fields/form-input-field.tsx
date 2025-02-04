"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Control,
  FieldValues,
  FieldPath,
  useController,
} from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormInputFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isLabel?: boolean; // If true, show label
  type?: "text" | "email" | "password";
  className?: string;
  value?: string
  disabled?: boolean
}

/**
 * A unified form field component that can be used for text, email, or password inputs.
 *
 * Features:
 * - Optional label display (controlled by `isLabel`)
 * - Required asterisk if `required` is true
 * - Password toggle if `type="password"`
 * - Displays validation error messages automatically
 */
export function FormInputField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "",
  placeholder = "",
  required = false,
  type = "text",
  className,
  value,
  disabled = false
}: FormInputFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <div className="relative">
        <FormControl>
          <Input
            type={inputType}
            placeholder={placeholder}
            {...field}
            value={field.value || value || ""} // Ensure value is bound to field
            className={isPasswordField ? "pr-10" : ""}
            disabled={disabled}
          />
        </FormControl>
        {isPasswordField && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        )}
      </div>
      {error && (
        <FormMessage className="text-[#FF3B3B] text-sm">
          {error.message}
        </FormMessage>
      )}
    </FormItem>
  );
}

