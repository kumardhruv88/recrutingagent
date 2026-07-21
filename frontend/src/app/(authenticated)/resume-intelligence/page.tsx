"use client";

import { useState } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { UploadWorkspace } from "./_components/UploadWorkspace";
import { AnalysisDashboard } from "./_components/AnalysisDashboard";
import { mockResumeAnalysis } from "@/data/resume-intelligence";
import { AnimatePresence, motion } from "framer-motion";

export default function ResumeIntelligencePage() {
  const [hasUploaded, setHasUploaded] = useState(false);

  return (
    <PageContainer>
      <AnimatePresence mode="wait">
        {!hasUploaded ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader 
              title="Resume Intelligence" 
              description="Upload a resume for AI-powered parsing, scoring, and matching."
            />
            <UploadWorkspace onUploadSuccess={() => setHasUploaded(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <AnalysisDashboard 
              data={mockResumeAnalysis} 
              onBack={() => setHasUploaded(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
