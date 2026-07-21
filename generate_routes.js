const fs = require('fs');
const path = require('path');

const routes = [
  { name: 'Dashboard', path: 'dashboard', icon: 'LayoutDashboard', desc: 'Overview of your hiring activity' },
  { name: 'Jobs', path: 'jobs', icon: 'Briefcase', desc: 'Manage your active and closed job postings' },
  { name: 'Candidates', path: 'candidates', icon: 'Users', desc: 'View and manage candidates across all jobs' },
  { name: 'Applications', path: 'applications', icon: 'FileText', desc: 'Review incoming applications' },
  { name: 'Interviews', path: 'interviews', icon: 'Calendar', desc: 'Schedule and conduct interviews' },
  { name: 'Assessments', path: 'assessments', icon: 'CheckSquare', desc: 'Manage candidate technical assessments' },
  { name: 'Resume Intelligence', path: 'resume-intelligence', icon: 'BrainCircuit', desc: 'AI-powered resume parsing and analysis' },
  { name: 'AI Copilot', path: 'copilot', icon: 'Bot', desc: 'Your intelligent hiring assistant' },
  { name: 'Analytics', path: 'analytics', icon: 'BarChart3', desc: 'Insights and reporting' },
  { name: 'Settings', path: 'settings', icon: 'Settings', desc: 'Manage your account and team preferences' }
];

const basePath = path.join(__dirname, 'frontend', 'src', 'app', '(authenticated)');

routes.forEach(route => {
  const dirPath = path.join(basePath, route.path);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const content = `import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { ${route.icon}, Plus } from "lucide-react";

export default function ${route.name.replace(/\s+/g, '')}Page() {
  return (
    <PageContainer>
      <PageHeader 
        title="${route.name}" 
        description="${route.desc}"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New ${route.name.split(' ')[0]}
          </Button>
        }
      />
      <EmptyState 
        title="No ${route.name.toLowerCase()} found"
        description="Get started by creating a new ${route.name.toLowerCase().split(' ')[0]}."
        icon={${route.icon}}
        action={
          <Button variant="outline">
            Create ${route.name.split(' ')[0]}
          </Button>
        }
      />
    </PageContainer>
  );
}
`;
  
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('Routes generated successfully.');
