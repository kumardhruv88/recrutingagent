"use client";

import { useState } from "react";
import { SettingsCategory, SettingsSidebar } from "./SettingsSidebar";
import { StickySaveBar } from "./StickySaveBar";
import { motion, AnimatePresence } from "framer-motion";

// Import tabs (we will create these next)
import { ProfileTab } from "./tabs/ProfileTab";
import { AppearanceTab } from "./tabs/AppearanceTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { OrganizationTab } from "./tabs/OrganizationTab";
import { AIPreferencesTab } from "./tabs/AIPreferencesTab";
import { IntegrationsTab } from "./tabs/IntegrationsTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { BillingTab } from "./tabs/BillingTab";
import { AuditTab } from "./tabs/AuditTab";

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState<SettingsCategory>("profile");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock save function
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
    }, 1000);
  };

  const handleReset = () => {
    setHasUnsavedChanges(false);
    // In a real app, you would reset the form state here
  };

  const renderTab = () => {
    const props = { onChange: () => setHasUnsavedChanges(true) };
    
    switch (activeTab) {
      case "profile":
        return <ProfileTab {...props} />;
      case "appearance":
        return <AppearanceTab {...props} />;
      case "notifications":
        return <NotificationsTab {...props} />;
      case "organization":
        return <OrganizationTab {...props} />;
      case "ai":
        return <AIPreferencesTab {...props} />;
      case "integrations":
        return <IntegrationsTab {...props} />;
      case "security":
        return <SecurityTab {...props} />;
      case "billing":
        return <BillingTab {...props} />;
      case "audit":
        return <AuditTab {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-24">
      {/* Sidebar Navigation */}
      <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Save Bar */}
      <StickySaveBar
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onReset={handleReset}
        isSaving={isSaving}
      />
    </div>
  );
}
