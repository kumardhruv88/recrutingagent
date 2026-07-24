import { cn } from "@/lib/utils";

interface NotificationTabsProps {
  activeTab: "All" | "Unread";
  setActiveTab: (tab: "All" | "Unread") => void;
  unreadCount: number;
}

export function NotificationTabs({ activeTab, setActiveTab, unreadCount }: NotificationTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg shrink-0">
      <button
        onClick={() => setActiveTab("All")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
          activeTab === "All" 
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("Unread")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2",
          activeTab === "Unread" 
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Unread
        {unreadCount > 0 && (
          <span className={cn(
            "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
            activeTab === "Unread"
              ? "bg-primary/10 text-primary"
              : "bg-muted-foreground/20 text-muted-foreground"
          )}>
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
