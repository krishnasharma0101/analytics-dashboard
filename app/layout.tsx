import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import DashboardShell from "@/components/DashboardShell";
import { TooltipProvider } from "@/components/ui/tooltip";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <TooltipProvider>
          <DashboardShell>{children}</DashboardShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
