import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NotificationSearchProps {
  query: string;
  setQuery: (val: string) => void;
}

export function NotificationSearch({ query, setQuery }: NotificationSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <Input 
        placeholder="Search notifications..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-500 h-9"
      />
    </div>
  );
}
