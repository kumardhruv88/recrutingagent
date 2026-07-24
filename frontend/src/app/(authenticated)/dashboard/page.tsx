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
      <div className="flex flex-col gap-6 lg:gap-8 w-full pb-10">
        <section className="flex flex-col gap-4">
          <WelcomeCard />
          <QuickActions />
        </section>

        <section>
          <KPICards />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <AnalyticsCharts />
          </div>
          <div className="lg:col-span-1">
            <HiringFunnel />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <RecentApplications />
          </div>
          <div className="lg:col-span-1">
            <AIInsights />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <UpcomingInterviews />
          </div>
          <div className="lg:col-span-1">
            <ActivityTimeline />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
