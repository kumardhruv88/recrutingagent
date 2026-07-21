import { Metadata } from "next";
import { AuditNav } from "./_components/AuditNav";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "HireMind AI - Audit Logs",
  description: "Monitor organization activity, security events, and audit logs.",
};

export default function AuditLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>
            Audit Logs
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor organization activity, security events, and view detailed audit trails.
          </p>
        </div>
      </div>
      
      <AuditNav />
      
      <main className="pt-4 mx-auto w-full max-w-[1400px]">
        {children}
      </main>
    </div>
  );
}
