
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { NotificationCategory } from "@/data/notifications";

interface NotificationFiltersProps {
  categories: NotificationCategory[];
  toggleCategory: (c: NotificationCategory) => void;
}

export function NotificationFilters({ categories, toggleCategory }: NotificationFiltersProps) {
  const allCategories: NotificationCategory[] = ["Mentions", "AI", "System", "Candidates", "Interviews", "Jobs"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3 border-zinc-200 dark:border-zinc-800">
          <Filter className="w-4 h-4" />
          Filter
          {categories.length > 0 && (
            <span className="ml-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">
              {categories.length}
            </span>
          )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        {allCategories.map(cat => (
          <DropdownMenuCheckboxItem
            key={cat}
            checked={categories.includes(cat)}
            onCheckedChange={() => toggleCategory(cat)}
            className="text-sm cursor-pointer"
          >
            {cat}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
