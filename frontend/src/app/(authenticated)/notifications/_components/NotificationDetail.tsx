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
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-muted/10">
        <Inbox className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground font-medium">Select a notification to view details</p>
      </div>
    );
  }

  const isUnread = notification.status === "Unread";

  return (
    <div className="h-full flex flex-col bg-background animate-in fade-in duration-300">
      {/* Detail Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-2">
          {isUnread && (
            <Button variant="ghost" size="sm" onClick={() => onMarkRead(notification.id)} className="h-8 text-muted-foreground" aria-label="Mark as read">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Read
            </Button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onArchive(notification.id)} className="h-8 w-8 text-muted-foreground hover:text-foreground" aria-label="Archive notification">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(notification.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive" aria-label="Delete notification">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex" aria-label="More actions">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <NotificationBadge category={notification.category} />
            <span className="text-sm text-muted-foreground">
              {format(new Date(notification.timestamp), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-8 leading-tight">
            {notification.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 p-4 rounded-xl border border-border bg-muted/30">
            {notification.actor.avatarUrl ? (
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={notification.actor.avatarUrl} alt={notification.actor.name} className="object-cover" />
              </Avatar>
            ) : (
              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {notification.actor.initials}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {notification.actor.name}
              </p>
              {notification.entity && (
                <p className="text-xs text-muted-foreground">
                  Related to {notification.entity.type}: <span className="font-medium text-foreground/80">{notification.entity.name}</span>
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p className="text-base">{notification.description}</p>
          </div>

          {notification.actions && notification.actions.length > 0 && (
            <div className="mt-10 flex items-center gap-3 pt-6 border-t border-border/60">
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
