"use client";

import { useState } from "react";
import { mockAIPreferences } from "@/data/settings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Video } from "lucide-react";

interface AIPreferencesTabProps {
  onChange: () => void;
}

export function AIPreferencesTab({ onChange }: AIPreferencesTabProps) {
  const [ai, setAi] = useState(mockAIPreferences);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">AI Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure how HireMind AI analyzes candidates and interviews.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="space-y-2">
          <Label>Preferred AI Model</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select the underlying language model used for generation tasks.
          </p>
          <Select
            value={ai.preferredModel}
            onValueChange={(val) => {
              setAi({ ...ai, preferredModel: val || "gpt-4-turbo" });
              onChange();
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Recommended)</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o (Fastest)</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus (Most Capable)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-lg">Resume Analysis</h4>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Extract Skills</Label>
              </div>
              <Switch
                checked={ai.resumeAnalysis.extractSkills}
                onCheckedChange={(val: boolean) => {
                  setAi({ ...ai, resumeAnalysis: { ...ai.resumeAnalysis, extractSkills: val } });
                  onChange();
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Score Experience</Label>
              </div>
              <Switch
                checked={ai.resumeAnalysis.scoreExperience}
                onCheckedChange={(val: boolean) => {
                  setAi({ ...ai, resumeAnalysis: { ...ai.resumeAnalysis, scoreExperience: val } });
                  onChange();
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Highlight Career Gaps</Label>
              </div>
              <Switch
                checked={ai.resumeAnalysis.highlightGaps}
                onCheckedChange={(val: boolean) => {
                  setAi({ ...ai, resumeAnalysis: { ...ai.resumeAnalysis, highlightGaps: val } });
                  onChange();
                }}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Video className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-lg">Interview Analysis</h4>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Generate Transcripts</Label>
              </div>
              <Switch
                checked={ai.interviewAnalysis.generateTranscripts}
                onCheckedChange={(val: boolean) => {
                  setAi({ ...ai, interviewAnalysis: { ...ai.interviewAnalysis, generateTranscripts: val } });
                  onChange();
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sentiment Analysis</Label>
              </div>
              <Switch
                checked={ai.interviewAnalysis.sentimentAnalysis}
                onCheckedChange={(val: boolean) => {
                  setAi({ ...ai, interviewAnalysis: { ...ai.interviewAnalysis, sentimentAnalysis: val } });
                  onChange();
                }}
              />
            </div>
          </Card>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-xl">
          <div className="space-y-0.5 max-w-xl">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-primary" />
              <Label className="text-base">AI Explainability</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              When enabled, the AI will provide a breakdown of how it arrived at its scores and recommendations.
            </p>
          </div>
          <Switch
            checked={ai.explainability}
            onCheckedChange={(val: boolean) => {
              setAi({ ...ai, explainability: val });
              onChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
