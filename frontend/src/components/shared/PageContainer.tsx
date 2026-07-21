import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <div className={cn("flex-1 space-y-6 p-6 md:p-8 pt-6", className)} {...props}>
      {children}
    </div>
  );
}
