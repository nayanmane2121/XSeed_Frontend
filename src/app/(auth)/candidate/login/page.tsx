/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAuth } from "@/hooks/fetch/useAuth";

const formSchema = z.object({
  email: z.string().min(1, "Please enter your email").email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password")
});

export default function CandidateLoginPage() {
  const [, setError] = useState("");
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError("");

      // Use the login function from the custom hook
      await login({
        email: values.email,
        password: values.password
      });
    } catch (err: any) {
      setError(err.error || "Invalid email or password");
    }
  }

  return (
    <div className="space-y-6">
      <Title text="Welcome back" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
 
          <FormInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
            required
          />

          <div className="text-right">
            <Link href="/forgot-password?type=candidate" className="text-sm underline text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Login
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <SocialLoginButtons />

      <div className="text-center text-sm">
        Dont have an account?
        <Link href="/candidate/sign-up" className="text-zinc-600 ml-1 underline">
          Signup
        </Link>
      </div>
    </div>
  );
}
