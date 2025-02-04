"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import AppProviders from "@/components/providers/app-provider";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

// export const metadata: Metadata = {
//   title: "Xseed Ai",
//   description: "Xseed Ai",
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-inter ${inter.variable} antialiased`}>
        <AppProviders>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
