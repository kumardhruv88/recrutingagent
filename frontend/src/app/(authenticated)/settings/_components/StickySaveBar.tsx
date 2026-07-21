"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";

interface StickySaveBarProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
}

export function StickySaveBar({
  hasUnsavedChanges,
  onSave,
  onReset,
  isSaving = false,
}: StickySaveBarProps) {
  return (
    <AnimatePresence>
      {hasUnsavedChanges && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
          <div className="bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl px-6 py-3 flex items-center justify-between border border-neutral-800 dark:border-neutral-200">
            <div className="text-sm font-medium">
              You have unsaved changes.
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                disabled={isSaving}
                className="text-neutral-300 dark:text-neutral-600 hover:text-white dark:hover:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-full h-8 px-4"
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={isSaving}
                className="bg-white dark:bg-black text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full h-8 px-4 font-semibold"
              >
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
