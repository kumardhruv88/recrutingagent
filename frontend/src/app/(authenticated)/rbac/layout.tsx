import { Metadata } from "next";
import { RbacSidebar } from "./_components/RbacSidebar";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "HireMind AI - Access Management",
  description: "Manage users, roles, and permissions.",
};

export default function RbacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            Access Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Configure roles, permissions, and monitor access across your organization.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pt-4">
        <aside className="w-full md:w-[220px] lg:w-[260px] flex-shrink-0">
          <RbacSidebar />
        </aside>
        <main className="flex-1 min-w-0">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
