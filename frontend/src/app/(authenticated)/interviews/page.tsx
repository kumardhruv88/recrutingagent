"use client";

import { useState } from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import { VoiceInterviewDashboard } from "./_components/VoiceInterviewDashboard";
import { LiveInterviewWorkspace } from "./_components/LiveInterviewWorkspace";
import { InterviewReviewWorkspace } from "./_components/InterviewReviewWorkspace";
import { mockSessions } from "@/data/voice-interview";

type ViewState = "dashboard" | "live" | "review";

export default function InterviewsPage() {
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const activeSession = activeSessionId 
    ? mockSessions.find(s => s.id === activeSessionId)
    : null;

  const handleJoinSession = (id: string) => {
    setActiveSessionId(id);
    setViewState("live");
  };

  const handleReviewSession = (id: string) => {
    setActiveSessionId(id);
    setViewState("review");
  };

  const handleBackToDashboard = () => {
    setActiveSessionId(null);
    setViewState("dashboard");
  };

  const handleEndLiveSession = () => {
    // In a real app, this would mutate the status to completed
    // Here we just route to review
    setViewState("review");
  };

  // The Live workspace uses its own fixed full-screen layout, so it breaks out of the standard PageContainer
  if (viewState === "live" && activeSession) {
    return (
      <LiveInterviewWorkspace 
        session={activeSession} 
        onEndSession={handleEndLiveSession} 
      />
    );
  }

  return (
    <PageContainer>
      {viewState === "dashboard" && (
        <VoiceInterviewDashboard 
          onJoinSession={handleJoinSession}
          onReviewSession={handleReviewSession}
        />
      )}

      {viewState === "review" && activeSession && (
        <InterviewReviewWorkspace 
          session={activeSession}
          onBack={handleBackToDashboard}
        />
      )}
    </PageContainer>
  );
}
