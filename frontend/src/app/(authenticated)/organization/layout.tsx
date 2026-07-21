import { Metadata } from "next";
import { OrgSidebar } from "./_components/OrgSidebar";
import { Building2 } from "lucide-react";
import { mockOrganization } from "@/data/organization";

export const metadata: Metadata = {
  title: "HireMind AI - Organization Management",
  description: "Manage your organization, teams, and billing.",
};

export default function OrganizationLayout({
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
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            {mockOrganization.name}
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your organization settings, members, and usage.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 pt-4">
        <aside className="w-full md:w-[220px] lg:w-[260px] flex-shrink-0">
          <OrgSidebar />
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
