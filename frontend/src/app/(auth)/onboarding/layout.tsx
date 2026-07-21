"use client";

import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Calculate progress based on path
  let progress = 0;
  if (pathname?.includes("organization")) progress = 25;
  if (pathname?.includes("invite")) progress = 50;
  if (pathname?.includes("role")) progress = 75;
  if (pathname?.includes("welcome")) progress = 100;

  return (
    <div className="w-full relative min-h-[500px] flex flex-col pt-8">
      {/* Progress Bar (hidden on welcome screen if you want, but kept for consistency) */}
      {!pathname?.includes("welcome") && (
        <div className="absolute top-0 left-0 right-0 -mt-8 pt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {progress / 25} of 3</span>
            <span>Setup Workspace</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}
      
      <div className="flex-1 flex flex-col justify-center w-full max-w-[420px] mx-auto">
        {children}
      </div>
    </div>
  );
}
