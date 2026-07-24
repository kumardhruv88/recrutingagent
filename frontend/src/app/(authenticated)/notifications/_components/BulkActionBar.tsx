import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Archive, Trash2, X } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  onMarkRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function BulkActionBar({ selectedCount, onClear, onMarkRead, onArchive, onDelete }: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full shadow-2xl px-4 py-2 flex items-center gap-4 z-50 pointer-events-auto"
        >
          <div className="flex items-center gap-2 pr-4 border-r border-primary-foreground/20">
            <span className="bg-background text-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {selectedCount}
            </span>
            <span className="text-sm font-medium">Selected</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onMarkRead} className="h-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" aria-label="Mark selected as read">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark Read
            </Button>
            <Button variant="ghost" size="sm" onClick={onArchive} className="h-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 hidden sm:flex" aria-label="Archive selected">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 text-red-400 hover:text-red-300 hover:bg-primary-foreground/10" aria-label="Delete selected">
              <Trash2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8 ml-2 text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full" aria-label="Clear selection">
            <X className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
