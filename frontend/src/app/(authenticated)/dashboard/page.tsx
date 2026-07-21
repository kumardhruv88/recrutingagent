import { PageContainer } from "@/components/shared/PageContainer";
import { WelcomeCard } from "./_components/WelcomeCard";
import { QuickActions } from "./_components/QuickActions";
import { KPICards } from "./_components/KPICards";
import { HiringFunnel } from "./_components/HiringFunnel";
import { AnalyticsCharts } from "./_components/AnalyticsCharts";
import { UpcomingInterviews } from "./_components/UpcomingInterviews";
import { RecentApplications } from "./_components/RecentApplications";
import { AIInsights } from "./_components/AIInsights";
import { ActivityTimeline } from "./_components/ActivityTimeline";

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="flex flex-col space-y-6 w-full pb-10">
        <section>
          <WelcomeCard />
          <QuickActions />
        </section>

        <section>
          <KPICards />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <AnalyticsCharts />
          <HiringFunnel />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <RecentApplications />
          <AIInsights />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <UpcomingInterviews />
          <ActivityTimeline />
        </section>
      </div>
    </PageContainer>
  );
}
