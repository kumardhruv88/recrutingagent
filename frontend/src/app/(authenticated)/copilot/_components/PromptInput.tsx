"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromptInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onStop?: () => void;
}

export function PromptInput({ input, setInput, onSubmit, isLoading, onStop }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() || attachments.length > 0) {
        onSubmit();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-white to-transparent dark:from-zinc-950 pointer-events-none" />
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        
        {/* Attachments Preview Area */}
        <AnimatePresence>
          {attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 p-4 pb-0 overflow-x-auto"
            >
              {attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-xl shrink-0 border border-zinc-200 dark:border-zinc-700">
                  <Paperclip className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <button 
                    onClick={() => removeAttachment(i)}
                    className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end p-2 pl-3">
          {/* Hidden File Input */}
          <input 
            type="file" 
            multiple 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 mb-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            disabled={isLoading}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Copilot..."
            disabled={isLoading}
            className="w-full max-h-[200px] min-h-[44px] py-3 px-3 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:opacity-50"
            rows={1}
          />

          <div className="flex flex-col justify-end shrink-0 pl-2 pb-1">
            {isLoading ? (
              <Button 
                onClick={onStop} 
                size="icon" 
                variant="destructive" 
                className="h-8 w-8 rounded-full shadow-sm"
              >
                <div className="w-3 h-3 bg-white rounded-sm" />
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  if (input.trim() || attachments.length > 0) {
                    onSubmit();
                  }
                }}
                size="icon" 
                className="h-8 w-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                disabled={!input.trim() && attachments.length === 0}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Copilot can make mistakes. Consider verifying important information.
        </p>
      </div>
    </div>
  );
}
