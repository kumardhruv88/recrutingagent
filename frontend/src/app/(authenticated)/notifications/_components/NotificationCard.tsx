import { formatDistanceToNow } from "date-fns";
import { NotificationItem } from "@/data/notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBadge } from "./NotificationBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: NotificationItem;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  isActive: boolean;
  onClick: () => void;
}

export function NotificationCard({ notification, isSelected, onSelect, isActive, onClick }: NotificationCardProps) {
  const isUnread = notification.status === "Unread";
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });

  return (
    <div 
      className={cn(
        "flex gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800/60 transition-colors cursor-pointer group relative",
        isActive ? "bg-zinc-100 dark:bg-zinc-800/80" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
        isUnread ? "bg-white dark:bg-zinc-950" : "bg-zinc-50/30 dark:bg-zinc-950/50 opacity-80"
      )}
      onClick={onClick}
    >
      {/* Unread Indicator */}
      {isUnread && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md" />
      )}

      {/* Checkbox (Clicking checkbox should not trigger card click) */}
      <div className="pt-1" onClick={e => e.stopPropagation()}>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={(checked) => onSelect(notification.id, checked as boolean)} 
          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-sm opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <NotificationBadge category={notification.category} className="hidden sm:flex" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              {notification.actor.name}
            </span>
          </div>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap shrink-0">
            {timeAgo}
          </span>
        </div>
        
        <div className="flex items-start gap-3">
          {notification.actor.avatarUrl ? (
            <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800 shrink-0">
              <AvatarImage src={notification.actor.avatarUrl} alt={notification.actor.name} className="object-cover" />
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800 shrink-0">
              <AvatarFallback className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 text-xs">
                {notification.actor.initials}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1 min-w-0">
            <h4 className={cn(
              "text-sm truncate mb-0.5",
              isUnread ? "font-bold text-zinc-900 dark:text-zinc-100" : "font-medium text-zinc-700 dark:text-zinc-300"
            )}>
              {notification.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {notification.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
