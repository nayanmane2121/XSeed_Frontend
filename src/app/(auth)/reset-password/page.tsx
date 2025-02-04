"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { FormInputField } from "@/components/ui/form-fields/form-input-field";
import { Title } from "@/components/ui/Title";
import toast from "react-hot-toast";
import { Info } from "lucide-react";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include uppercase, lowercase, number and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userType = searchParams.get("type") || "candidate";

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: PasswordFormValues) {
    try {
      setStatus("loading");
      setError("");

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: values.password, userType }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setStatus("success");
      toast.success("Password changed successfully");
      setTimeout(() => {
        router.push(`/${userType}/login`);
      }, 2000);
    } catch {
      setError("Failed to reset password. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <Title text=" Create Password" />
        <div className="p-2 flex rounded-lg bg-[#FFF8EA] ">
          <Info color="#B76B27" className="w-[120px]" />
          <p className="text-sm text-left px-2 text-[#B76B27]">
            Your password must be at least 8 characters long and include a
            combination of uppercase letters, lowercase letters, numbers, and
            special characters (e.g., @, #, $, %)
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInputField
            control={form.control}
            name="password"
            label="New Password"
            placeholder="New Password"
            type="password"
            required
          />

          <FormInputField
            control={form.control}
            name="confirmPassword"
            label="Re-enter New Password"
            placeholder="Re-enter New Password"
            type="password"
            required
          />

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={status === "loading"}
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
}
