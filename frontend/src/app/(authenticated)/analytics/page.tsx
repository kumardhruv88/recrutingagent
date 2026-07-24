import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, CalendarIcon } from "lucide-react";
import { KPISummaryCards } from "./_components/KPISummaryCards";
import { AnalyticsCharts } from "./_components/AnalyticsCharts";
import { RecruiterPerformance } from "./_components/RecruiterPerformance";
import { AnalyticsFilters } from "./_components/AnalyticsFilters";

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Executive Analytics" 
        description="Comprehensive insights and hiring performance metrics"
        primaryAction={
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-card border border-border rounded-md px-3 py-2 text-sm shadow-sm hidden sm:flex">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Last 30 Days</span>
            </div>
            <Button variant="outline" className="shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        }
      />
      
      <div className="space-y-8 pb-8">
        <AnalyticsFilters />
        
        <div>
          <h3 className="text-lg font-medium tracking-tight mb-4 text-foreground">Pipeline Overview</h3>
          <KPISummaryCards />
        </div>
        
        <AnalyticsCharts />
        
        <div className="pt-2">
          <RecruiterPerformance />
        </div>
      </div>
    </PageContainer>
  );
}
