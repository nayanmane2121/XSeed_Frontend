/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/Title";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/fetch/useAuth";

const formSchema = z.object({
  team: z.string({
    required_error: "Please select your team"
  }),
  login: z.string().refine(
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]+$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    },
    { message: "Please enter a valid email or phone number" }
  ),
  password: z.string().min(1, "Please enter your password")
});

export default function DynamicLoginField() {
  const [inputType, setInputType] = useState<"email" | "phone">("email");
  const [, setPhone] = useState("");

  const [error, setError] = useState("");
  const { login } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError("");

      // Use the login function from the custom hook
      await login({
        email: values.login,
        password: values.password
      });

      // fetch("https://b8f1-223-31-216-162.ngrok-free.app/UserService/user/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ userName: values.email, password: values.password })
      // })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error(`HTTP error! status: ${response.status}`);
      //     }
      //     return response.json();
      //   })
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.error("Error:", error);
      //   });
    } catch (err: any) {
      console.error(err);
      setError(err.error || "Invalid email or password");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team: "",
      login: "",
      password: ""
    }
  });

  const handleInputChange = (value: string) => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    // Dynamically switch between email and phone based on input value
    if (phoneRegex.test(value)) {
      setInputType("phone");
    } else {
      setInputType("email");
    }
    form.setValue("login", value);
  };

  return (
    <div className="space-y-6">
      <Title text="Log in" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Team<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email or Phone<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  {inputType === "phone" ? (
                    <PhoneInput
                      country={"us"}
                      value={field.value}
                      onChange={(value) => {
                        setPhone(value);
                        field.onChange(value);
                      }}
                      inputStyle={{ width: "100%" }}
                    />
                  ) : (
                    <Input
                      placeholder="Enter your email or phone number"
                      value={field.value}
                      onChange={(e) => handleInputChange(e.target.value)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-right">
            <Link href="/forgot-password?type=recruiter" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <div className="text-sm text-red-500 text-center">{error}</div>}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
