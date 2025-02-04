"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SocialLoginButtons } from "@/components/ui/auth/social-login-buttons";
import { FormInputField } from "@/components/ui/form-fields/form-input-field";
import { Title } from "@/components/ui/Title";

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

export default function CandidateSignupPage() {
  const [error, setError] = useState("");

  console.log(error);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError("");
      // Implement registration logic here
      console.log("Registration values:", values);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <Title text="Create your account" />

      <SocialLoginButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInputField
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />
            <FormInputField
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email ID"
              required
            />

            <FormInputField
              control={form.control}
              name="mobile"
              label="Mobile"
              placeholder="Enter your contact"
              required
            />
          </div>

          <FormInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
          />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
          >
            Create account
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/candidate/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
