import { NotificationItem } from "@/data/notifications";
import { NotificationCard } from "./NotificationCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "./EmptyState";

interface NotificationListProps {
  notifications: NotificationItem[];
  selectedIds: Set<string>;
  toggleSelection: (id: string, checked: boolean) => void;
  activeId: string | null;
  onNotificationClick: (id: string) => void;
}

export function NotificationList({ 
  notifications, 
  selectedIds, 
  toggleSelection, 
  activeId, 
  onNotificationClick 
}: NotificationListProps) {
  
  if (notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col pb-20">
        {notifications.map(notif => (
          <NotificationCard 
            key={notif.id}
            notification={notif}
            isSelected={selectedIds.has(notif.id)}
            onSelect={toggleSelection}
            isActive={activeId === notif.id}
            onClick={() => onNotificationClick(notif.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
