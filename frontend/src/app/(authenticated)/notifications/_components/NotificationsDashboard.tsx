"use client";

import { useState, useMemo } from "react";
import { mockNotifications, NotificationItem, NotificationCategory } from "@/data/notifications";
import { NotificationTabs } from "./NotificationTabs";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationSearch } from "./NotificationSearch";
import { NotificationList } from "./NotificationList";
import { NotificationDetail } from "./NotificationDetail";
import { BulkActionBar } from "./BulkActionBar";
import { NotificationSettings } from "./NotificationSettings";
import { Inbox, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationsDashboard() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<"All" | "Unread">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<NotificationCategory[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeNotificationId, setActiveNotificationId] = useState<string | null>(null);
  
  // Mobile drawer state
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);

  const toggleCategory = (cat: NotificationCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSelection = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleMarkRead = (ids: string[]) => {
    setNotifications(prev => prev.map(n => ids.includes(n.id) ? { ...n, status: "Read" } : n));
    clearSelection();
  };

  const handleArchive = (ids: string[]) => {
    // UI Only: just remove from list for demo
    setNotifications(prev => prev.filter(n => !ids.includes(n.id)));
    clearSelection();
    if (activeNotificationId && ids.includes(activeNotificationId)) {
      setActiveNotificationId(null);
      setShowDetailOnMobile(false);
    }
  };

  const handleDelete = (ids: string[]) => {
    // UI Only: just remove from list for demo
    setNotifications(prev => prev.filter(n => !ids.includes(n.id)));
    clearSelection();
    if (activeNotificationId && ids.includes(activeNotificationId)) {
      setActiveNotificationId(null);
      setShowDetailOnMobile(false);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (activeTab === "Unread" && n.status !== "Unread") return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(n.category)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(query) || 
               n.description.toLowerCase().includes(query) ||
               n.actor.name.toLowerCase().includes(query);
      }
      return true;
    });
  }, [notifications, activeTab, selectedCategories, searchQuery]);

  const unreadCount = notifications.filter(n => n.status === "Unread").length;
  const activeNotification = notifications.find(n => n.id === activeNotificationId) || null;

  return (
    <div className="h-[calc(100vh-theme(spacing.14)-theme(spacing.8))] flex flex-col -mx-4 sm:-mx-8 -mb-8 overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pointer-events-auto relative">
      
      {/* Header Toolbar */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-zinc-50/50 dark:bg-zinc-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Inbox className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 hidden sm:block">Inbox</h2>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end max-w-2xl">
          <div className="flex-1 max-w-sm hidden sm:block">
            <NotificationSearch query={searchQuery} setQuery={setSearchQuery} />
          </div>
          <NotificationFilters categories={selectedCategories} toggleCategory={toggleCategory} />
          <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadCount} />
          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />
          <NotificationSettings />
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left List Pane */}
        <div className={`w-full md:w-[400px] lg:w-[450px] shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/30 flex flex-col ${showDetailOnMobile ? 'hidden md:flex' : 'flex'}`}>
          <div className="sm:hidden p-3 border-b border-zinc-200 dark:border-zinc-800">
            <NotificationSearch query={searchQuery} setQuery={setSearchQuery} />
          </div>
          <div className="flex-1 overflow-hidden relative">
            <NotificationList 
              notifications={filteredNotifications}
              selectedIds={selectedIds}
              toggleSelection={toggleSelection}
              activeId={activeNotificationId}
              onNotificationClick={(id) => {
                setActiveNotificationId(id);
                if (notifications.find(n => n.id === id)?.status === "Unread") {
                   setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "Read" } : n));
                }
                setShowDetailOnMobile(true);
              }}
            />
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className={`flex-1 bg-white dark:bg-zinc-950 relative ${showDetailOnMobile ? 'block' : 'hidden md:block'}`}>
          {showDetailOnMobile && (
            <div className="md:hidden h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4">
              <Button variant="ghost" size="sm" onClick={() => setShowDetailOnMobile(false)} className="-ml-2">
                <Menu className="w-4 h-4 mr-2" />
                Back to Inbox
              </Button>
            </div>
          )}
          <NotificationDetail 
            notification={activeNotification}
            onMarkRead={(id) => handleMarkRead([id])}
            onArchive={(id) => handleArchive([id])}
            onDelete={(id) => handleDelete([id])}
          />
        </div>

        {/* Bulk Action Bar */}
        <BulkActionBar 
          selectedCount={selectedIds.size}
          onClear={clearSelection}
          onMarkRead={() => handleMarkRead(Array.from(selectedIds))}
          onArchive={() => handleArchive(Array.from(selectedIds))}
          onDelete={() => handleDelete(Array.from(selectedIds))}
        />
      </div>
    </div>
  );
}
