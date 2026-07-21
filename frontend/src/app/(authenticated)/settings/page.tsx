import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { SettingsLayout } from "./_components/SettingsLayout";

export const metadata = {
  title: "Settings - HireMind AI",
  description: "Manage your HireMind AI settings and preferences.",
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your account, organization, and AI preferences."
      />
      
      <div className="mt-8">
        <SettingsLayout />
      </div>
    </PageContainer>
  );
}
