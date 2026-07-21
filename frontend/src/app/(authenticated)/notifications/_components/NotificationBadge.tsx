import { Badge } from "@/components/ui/badge";
import { NotificationCategory } from "@/data/notifications";
import { AtSign, Sparkles, Server, Users, Calendar, Briefcase } from "lucide-react";

interface NotificationBadgeProps {
  category: NotificationCategory;
  className?: string;
}

export function NotificationBadge({ category, className }: NotificationBadgeProps) {
  switch (category) {
    case "Mentions":
      return (
        <Badge variant="outline" className={`bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800 ${className}`}>
          <AtSign className="w-3 h-3 mr-1" />
          Mentions
        </Badge>
      );
    case "AI":
      return (
        <Badge variant="outline" className={`bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800 ${className}`}>
          <Sparkles className="w-3 h-3 mr-1" />
          AI Insight
        </Badge>
      );
    case "System":
      return (
        <Badge variant="outline" className={`bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700 ${className}`}>
          <Server className="w-3 h-3 mr-1" />
          System
        </Badge>
      );
    case "Candidates":
      return (
        <Badge variant="outline" className={`bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 ${className}`}>
          <Users className="w-3 h-3 mr-1" />
          Candidate
        </Badge>
      );
    case "Interviews":
      return (
        <Badge variant="outline" className={`bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800 ${className}`}>
          <Calendar className="w-3 h-3 mr-1" />
          Interview
        </Badge>
      );
    case "Jobs":
      return (
        <Badge variant="outline" className={`bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 ${className}`}>
          <Briefcase className="w-3 h-3 mr-1" />
          Job
        </Badge>
      );
    default:
      return null;
  }
}
