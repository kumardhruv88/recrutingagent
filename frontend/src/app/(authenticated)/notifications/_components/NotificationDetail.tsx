import { NotificationItem } from "@/data/notifications";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationBadge } from "./NotificationBadge";
import { Inbox, CheckCircle2, Archive, Trash2, MoreHorizontal } from "lucide-react";

interface NotificationDetailProps {
  notification: NotificationItem | null;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationDetail({ notification, onMarkRead, onArchive, onDelete }: NotificationDetailProps) {
  if (!notification) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-50/50 dark:bg-zinc-950/20">
        <Inbox className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Select a notification to view details</p>
      </div>
    );
  }

  const isUnread = notification.status === "Unread";

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-950 animate-in fade-in duration-300">
      {/* Detail Toolbar */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-2">
          {isUnread && (
            <Button variant="ghost" size="sm" onClick={() => onMarkRead(notification.id)} className="h-8 text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Read
            </Button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onArchive(notification.id)} className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(notification.id)} className="h-8 w-8 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hidden sm:flex">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <NotificationBadge category={notification.category} />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {format(new Date(notification.timestamp), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 leading-tight">
            {notification.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            {notification.actor.avatarUrl ? (
              <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
                <AvatarImage src={notification.actor.avatarUrl} alt={notification.actor.name} className="object-cover" />
              </Avatar>
            ) : (
              <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
                <AvatarFallback className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {notification.actor.initials}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {notification.actor.name}
              </p>
              {notification.entity && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Related to {notification.entity.type}: <span className="font-medium text-zinc-700 dark:text-zinc-300">{notification.entity.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <p className="text-base">{notification.description}</p>
          </div>

          {notification.actions && notification.actions.length > 0 && (
            <div className="mt-10 flex items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
              {notification.actions.map((action, idx) => (
                <Button key={idx} variant={action.variant || "default"}>
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
