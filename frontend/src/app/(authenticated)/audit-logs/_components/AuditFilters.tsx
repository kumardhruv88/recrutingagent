import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import Link from "next/link";

interface AuditFiltersProps {
  onSearch: (term: string) => void;
  onFilterModule: (module: string) => void;
  onFilterSeverity: (severity: string) => void;
}

export function AuditFilters({ onSearch, onFilterModule, onFilterSeverity }: AuditFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full bg-card p-3 rounded-lg border shadow-sm">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by actor, target, or IP address..." 
          className="pl-9 bg-background w-full"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select onValueChange={(val: string | null) => onFilterModule(val || "all")}>
          <SelectTrigger className="w-[140px] bg-background">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            <SelectItem value="Authentication">Authentication</SelectItem>
            <SelectItem value="Organization">Organization</SelectItem>
            <SelectItem value="RBAC">RBAC</SelectItem>
            <SelectItem value="Billing">Billing</SelectItem>
            <SelectItem value="Settings">Settings</SelectItem>
            <SelectItem value="AI">AI Events</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val: string | null) => onFilterSeverity(val || "all")}>
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
        
        <Link href="/audit-logs/exports" className={buttonVariants({ variant: "outline", size: "icon" })} title="Export Logs">
          <Download className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
