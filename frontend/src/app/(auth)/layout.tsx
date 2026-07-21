import { Metadata } from "next";
import { AuthIllustration } from "./_components/AuthIllustration";

export const metadata: Metadata = {
  title: "HireMind AI - Authentication",
  description: "Sign in or create an account to access HireMind AI.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left side: Content / Forms */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-[420px] mx-auto flex flex-col justify-center min-h-[500px]">
          {children}
        </div>
      </div>

      {/* Right side: Illustration / Branding Panel */}
      <div className="hidden md:block relative overflow-hidden bg-muted/30">
        <AuthIllustration />
      </div>
    </div>
  );
}
