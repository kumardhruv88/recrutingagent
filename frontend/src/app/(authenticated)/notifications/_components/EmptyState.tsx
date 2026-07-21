import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        All caught up
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
        There are no notifications matching your current filters. Check back later.
      </p>
    </div>
  );
}
