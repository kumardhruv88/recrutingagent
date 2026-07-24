"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService, Application } from "@/services/applications";
import { Job } from "@/services/jobs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, GripVertical, Search, Filter, Calendar, Mail, FileText, User, Briefcase, Star, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

interface JobPipelineTabProps {
  job: Job;
}

export function JobPipelineTab({}: JobPipelineTabProps) {
const PIPELINE_COLUMNS = [
  { id: "Applied", title: "Applied" },
  { id: "Screening", title: "Screening" },
  { id: "Interview", title: "Interview" },
  { id: "Assessment", title: "Assessment" },
  { id: "Offer", title: "Offer" },
  { id: "Hired", title: "Hired" }
];

  const queryClient = useQueryClient();

  const { data: applicationsResponse, isLoading } = useQuery({
    queryKey: ["applications", { job_id: job.id }],
    queryFn: () => applicationService.getApplications()
  });

  const applications = (applicationsResponse?.items || []).filter(app => app.job_id === job.id);
  
  const updateStageMutation = useMutation({
    mutationFn: ({ appId, newStage }: { appId: string, newStage: string }) => 
      applicationService.updateApplicationStage(appId, newStage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications", { job_id: job.id }] });
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  // Drag and drop state
  const [draggedApplicationId, setDraggedApplicationId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  const filteredApplications = applications.filter(app => {
    const candidate = app.candidate;
    if (!candidate) return false;
    const name = `${candidate.first_name} ${candidate.last_name}`;
    const exp = `${candidate.years_of_experience} years`;
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           exp.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedApplication = applications.find(a => a.candidate_id === selectedCandidateId);
  const selectedCandidate = selectedApplication?.candidate;

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedApplicationId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverColumnId(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumnId(null);
    
    if (draggedApplicationId) {
      updateStageMutation.mutate({ appId: draggedApplicationId, newStage: columnId });
    }
    setDraggedApplicationId(null);
  };

  const handleDragEnd = () => {
    setDraggedApplicationId(null);
    setDragOverColumnId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
      {/* Pipeline Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search candidates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 flex-1 custom-scrollbar">
        {isLoading ? (
          <div className="w-full flex items-center justify-center text-muted-foreground">Loading pipeline...</div>
        ) : PIPELINE_COLUMNS.map((column) => {
          const columnApplications = filteredApplications.filter(app => app.current_stage === column.id);
          const isDragOver = dragOverColumnId === column.id;
          
          return (
            <div 
              key={column.id} 
              className={`w-[320px] shrink-0 flex flex-col rounded-xl border transition-colors ${
                isDragOver ? "bg-muted/60 border-primary/50" : "bg-muted/30 border-border"
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-background/50 rounded-t-xl sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{column.title}</h3>
                  <Badge variant="secondary" className="bg-background/80 text-muted-foreground font-medium rounded-full px-2 py-0.5">
                    {columnApplications.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Column Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar min-h-[150px]">
                <AnimatePresence>
                  {columnApplications.map(application => {
                    const candidate = application.candidate;
                    if (!candidate) return null;
                    const isDragging = draggedApplicationId === application.id;
                    const candidateName = `${candidate.first_name} ${candidate.last_name}`;
                    
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={application.id}
                        draggable={true}
                        onDragStart={(e: unknown) => handleDragStart(e as React.DragEvent, application.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedCandidateId(candidate.id)}
                        className={`bg-card p-4 rounded-xl border shadow-sm hover:shadow-sm transition-all cursor-grab active:cursor-grabbing group ${
                          isDragging ? "border-primary/50 ring-1 ring-primary/20" : "border-border hover:border-border/80"
                        } ${updateStageMutation.isPending && updateStageMutation.variables?.appId === application.id ? 'opacity-50' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1 cursor-grab text-muted-foreground hidden sm:block">
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <Avatar className="h-9 w-9 border border-border shadow-sm">
                              <AvatarImage src={candidate.resume_url || undefined} alt={candidateName} />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                                {candidate.first_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{candidateName}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{candidate.years_of_experience || 0} years</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent text-[11px] px-2 py-0 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              {application.ai_match_score || "N/A"} Score
                            </Badge>
                          </div>
                          <div className="flex items-center -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-card">
                              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[10px]">RC</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                  
                {/* Empty State Drop Zone */}
                {columnApplications.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className={`h-24 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors ${
                      isDragOver ? "border-primary/50 bg-primary/5" : "border-border bg-transparent"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground font-medium">
                      {isDragOver ? "Drop candidate here" : "No candidates"}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Drawer (Sheet) */}
      <Sheet open={!!selectedCandidateId} onOpenChange={(open) => !open && setSelectedCandidateId(null)}>
        <SheetContent className="sm:max-w-md md:max-w-lg w-[90vw] overflow-y-auto p-0 flex flex-col border-l border-border bg-background">
          {selectedCandidate && (
            <>
              <div className="p-6 border-b border-border bg-muted/20 relative">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-border shadow-sm">
                    <AvatarImage src={selectedCandidate.resume_url || undefined} alt={`${selectedCandidate.first_name} ${selectedCandidate.last_name}`} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                      {selectedCandidate.first_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground">{selectedCandidate.first_name} {selectedCandidate.last_name}</h2>
                    <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {selectedCandidate.years_of_experience || 0} years experience
                    </p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        AI Score: {selectedApplication?.ai_match_score || "N/A"}
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        Stage: {selectedApplication?.current_stage}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Application Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Applied Date</p>
                      <p className="text-sm font-medium">{new Date(selectedApplication?.applied_at || "").toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-medium">Platform</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{selectedCandidate.phone || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-primary hover:underline cursor-pointer">
                        {selectedCandidate.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedCandidate.skills || []).map(skill => (
                      <Badge key={skill} variant="outline" className="bg-muted/50 font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Resume & Documents
                  </h3>
                  <div className="p-4 border border-border rounded-xl bg-card flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Resume_2023.pdf</p>
                        <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <SheetFooter className="p-6 border-t border-border bg-muted/20 flex-col sm:flex-row gap-3">
                <Button variant="outline" className="w-full sm:w-auto">Reject</Button>
                <Button className="w-full sm:w-auto ml-auto gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Interview
                </Button>
                <Button className="w-full sm:w-auto gap-2" variant="secondary">
                  <Mail className="h-4 w-4" />
                  Message
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
