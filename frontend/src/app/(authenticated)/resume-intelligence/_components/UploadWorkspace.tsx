"use client";

import { useState } from "react";
import { UploadCloud, File, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UploadWorkspaceProps {
  onUploadSuccess: () => void;
}

export function UploadWorkspace({ onUploadSuccess }: UploadWorkspaceProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleSimulateUpload();
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onUploadSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          AI Resume Intelligence
        </h2>
        <p className="text-zinc-500 mt-2">
          Upload a resume to instantly extract insights, score against ATS, and find matching jobs.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center min-h-[400px] ${
          isDragging 
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-400" 
            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <File className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Analyzing Resume...</h3>
            <p className="text-sm text-zinc-500">Extracting entities and running AI models</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <UploadCloud className="h-8 w-8" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Drag and drop your resume here
              </h3>
              <p className="text-zinc-500 max-w-sm mx-auto text-sm">
                Supported formats: PDF, DOCX, TXT. Maximum file size: 10MB.
              </p>
            </div>
            
            <div className="flex items-center w-full max-w-xs gap-4 my-2">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
              <span className="text-xs text-zinc-400 font-medium uppercase">OR</span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            
            <Button size="lg" onClick={handleSimulateUpload} className="px-8 rounded-full shadow-sm">
              Browse Files
            </Button>
          </div>
        )}
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Smart Parsing</h4>
            <p className="text-xs text-zinc-500 mt-1">Extracts skills, experience, and education automatically.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">ATS Evaluation</h4>
            <p className="text-xs text-zinc-500 mt-1">Scores resume against standard ATS parsers.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Job Matching</h4>
            <p className="text-xs text-zinc-500 mt-1">Finds the best open roles for the candidate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
