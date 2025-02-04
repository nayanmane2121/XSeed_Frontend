/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/ui/form-fields/form-input-field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { toast } from "react-hot-toast";
import { CountdownTimer } from "@/components/ui/countdown-timer";

type ResetMethod = "email" | "phone";

const methodSchema = z.object({
  method: z.enum(["email", "phone"], {
    required_error: "Please select a reset method"
  })
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number")
});

const otpSchema = z.object({
  otp: z.string().length(6, "Please enter a valid OTP"),
  contact : z.string()
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include uppercase, lowercase, number and special character"
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type Step = "method" | "contact" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "candidate";

  const [step, setStep] = useState<Step>("method");
  const [resetMethod, setResetMethod] = useState<ResetMethod | null>(null);
  const [contact, setContact] = useState("");
  const [showResendTimer, setShowResendTimer] = useState(false);

  const methodForm = useForm<z.infer<typeof methodSchema>>({
    resolver: zodResolver(methodSchema)
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema)
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema)
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema)
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema)
  });

  const onMethodSubmit = (values: z.infer<typeof methodSchema>) => {
    setResetMethod(values.method);
    setStep("contact");
  };

  const onContactSubmit = async (values: z.infer<typeof emailSchema> | z.infer<typeof phoneSchema>) => {
    try {
      // Here you would make an API call to send OTP
      const contactValue = "email" in values ? values.email : values.phone;
      setContact(contactValue);
      setStep("otp");
      setShowResendTimer(true);
      toast.success(`OTP sent to your ${resetMethod}`);
    } catch (err : any) {
      toast.error(err.error || "Failed to send OTP. Please try again.");
    }
  };

  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    console.log(values)
    try {
      // Here you would verify the OTP
      setStep("password");
    } catch (err : any) {
      toast.error(err.error || "Invalid OTP. Please try again.");
    }
  };

  console.log(contact)

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    console.log(values)
    try {
      // Here you would reset the password
      toast.success("Password reset successfully");
      router.push(`/${userType}/login`);
    } catch (err : any) {
      toast.error(err.error || "Failed to reset password. Please try again.");
    }
  };

  const handleResendOTP = () => {
    setShowResendTimer(true);
    // Here you would make an API call to resend OTP
    toast.success(`OTP resent to your ${resetMethod}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        {step === "password" ? "Create Password" : "Reset your Password"}
      </h1>

      {step === "method" && (
        <Form {...methodForm}>
          <form onSubmit={methodForm.handleSubmit(onMethodSubmit)} className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">Choose how you&apos;d like to reset your password</p>
              <RadioGroup
                defaultValue={methodForm.getValues("method")}
                onValueChange={(value) => methodForm.setValue("method", value as ResetMethod)}
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="email"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="email" id="email" className="sr-only" />
                  Reset via Email
                </Label>
                <Label
                  htmlFor="phone"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value="phone" id="phone" className="sr-only" />
                  Reset via Phone
                </Label>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Proceed
            </Button>
          </form>
        </Form>
      )}

      {step === "contact" && resetMethod === "email" && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onContactSubmit)} className="space-y-6">
            <FormInputField
              control={emailForm.control}
              name="email"
              label="Enter email address"
              placeholder="Enter your email"
              required
            />
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      )}

      {step === "contact" && resetMethod === "phone" && (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onContactSubmit)} className="space-y-6">
            <FormInputField
              control={phoneForm.control}
              name="phone"
              label="Enter contact number"
              placeholder="Enter your phone number"
              required
            />
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      )}

      {step === "otp" && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
              <Info className="inline-block h-4 w-4 mr-2" />
              We&apos;ve sent a 6-digit OTP to your {resetMethod}. Please enter it below to continue.
            </div>

            <div className="space-y-6">
              {/* Displaying the email or phone */}
              <FormInputField
                control={otpForm.control}
                name="contact"
                label={resetMethod === "email" ? "Email Address" : "Contact Number"}
                value={contact} // Bind to the `contact` state
                disabled // Prevent user from editing it
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="otp">
                    Enter OTP<span className="text-red-500">*</span>
                  </Label>
                  {showResendTimer ? (
                    <span className="text-sm text-muted-foreground">
                      Resend in <CountdownTimer seconds={30} onComplete={() => setShowResendTimer(false)} />
                    </span>
                  ) : (
                    <Button type="button" variant="link" className="text-sm p-0 h-auto" onClick={handleResendOTP}>
                      Resend OTP
                    </Button>
                  )}
                </div>
                <OTPInput value={otpForm.watch("otp") || ""} onChange={(value) => otpForm.setValue("otp", value)} />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Verify & Continue
            </Button>
          </form>
        </Form>
      )}

      {step === "password" && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-600">
              <Info className="inline-block h-4 w-4 mr-2" />
              Your password must be at least 8 characters long and include a combination of uppercase letters, lowercase
              letters, numbers, and special characters (e.g., @, #, $, %)
            </div>

            <div className="space-y-4">
              <FormInputField control={passwordForm.control} name="password" label="New Password" type="password" required />

              <FormInputField
                control={passwordForm.control}
                name="confirmPassword"
                label="Re-enter New Password"
                type="password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Reset
            </Button>
          </form>
        </Form>
      )}

      <div className="text-center">
        <Link href={`/${userType}/login`} className="text-sm text-primary hover:underline">
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}
