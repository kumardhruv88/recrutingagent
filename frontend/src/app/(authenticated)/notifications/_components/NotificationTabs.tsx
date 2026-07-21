import { cn } from "@/lib/utils";

interface NotificationTabsProps {
  activeTab: "All" | "Unread";
  setActiveTab: (tab: "All" | "Unread") => void;
  unreadCount: number;
}

export function NotificationTabs({ activeTab, setActiveTab, unreadCount }: NotificationTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg shrink-0">
      <button
        onClick={() => setActiveTab("All")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
          activeTab === "All" 
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        )}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("Unread")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2",
          activeTab === "Unread" 
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
        )}
      >
        Unread
        {unreadCount > 0 && (
          <span className={cn(
            "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
            activeTab === "Unread"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          )}>
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
