import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import DashboardShell from "@/components/DashboardShell";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "City of Madrid | Analytics Dashboard",
  description:
    "Municipal analytics platform for the City of Madrid. Monitor citizen data, business metrics, and AI-powered insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
