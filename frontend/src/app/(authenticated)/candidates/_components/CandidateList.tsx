"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { mockCandidates } from "@/data/candidates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, LayoutGrid, List, ChevronLeft, ChevronRight, MoreHorizontal, Download, Trash2, Mail } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

export function CandidateList() {
  const [view, setView] = useState<"table" | "card">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Filter candidates locally
  const filteredCandidates = mockCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.appliedJob.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredCandidates.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCandidates.map(c => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Screening": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "Interview": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "Assessment": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Offer": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Hired": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates, skills, or jobs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0 gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {selectedIds.size > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mr-2 bg-background shadow-sm border border-border p-1 rounded-md"
            >
              <span className="text-sm font-medium text-muted-foreground px-2">{selectedIds.size} selected</span>
              <Button variant="outline" size="sm" className="h-8 gap-2"><Mail className="h-4 w-4"/> Email</Button>
              <Button variant="outline" size="sm" className="h-8 gap-2"><Download className="h-4 w-4"/> Export</Button>
              <Button variant="outline" size="sm" className="h-8 gap-2 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/> Reject</Button>
            </motion.div>
          )}
          <div className="flex items-center rounded-md border border-border p-1 bg-muted/50">
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => setView("table")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "card" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => setView("card")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {view === "table" ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-12 text-center whitespace-nowrap">
                    <Checkbox
                      checked={selectedIds.size === filteredCandidates.length && filteredCandidates.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Candidate</TableHead>
                  <TableHead className="whitespace-nowrap">Role</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">AI Match</TableHead>
                  <TableHead className="whitespace-nowrap">Last Updated</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.length > 0 ? filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-muted/50 transition-colors border-border">
                    <TableCell className="text-center whitespace-nowrap">
                      <Checkbox
                        checked={selectedIds.has(candidate.id)}
                        onCheckedChange={() => toggleSelect(candidate.id)}
                        aria-label={`Select ${candidate.name}`}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <Link href={`/candidates/${candidate.id}`} className="font-medium hover:underline text-foreground">
                            {candidate.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">{candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="font-medium text-foreground">{candidate.appliedJob}</div>
                      <div className="text-xs text-muted-foreground">{candidate.experience}</div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline" className={`${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                        candidate.aiScore >= 90 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                        candidate.aiScore >= 80 ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50" :
                        "text-muted-foreground bg-secondary"
                      }`}>
                        {candidate.aiScore}%
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {candidate.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/candidates/${candidate.id}`}>View Profile</Link>} />
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Reject Candidate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No candidates found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCandidates.length > 0 ? filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/candidates/${candidate.id}`} className="font-semibold text-lg text-foreground hover:underline line-clamp-1">
                          {candidate.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">{candidate.location}</div>
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedIds.has(candidate.id)}
                      onCheckedChange={() => toggleSelect(candidate.id)}
                      aria-label={`Select ${candidate.name}`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">{candidate.appliedJob}</div>
                      <div className="text-xs text-muted-foreground">{candidate.experience} experience</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </Badge>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                        candidate.aiScore >= 90 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                        candidate.aiScore >= 80 ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50" :
                        "text-muted-foreground bg-secondary"
                      }`}>
                        AI: {candidate.aiScore}%
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {candidate.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal text-muted-foreground">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal text-muted-foreground">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-background rounded-xl border border-border shadow-sm">
              No candidates found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-{filteredCandidates.length}</strong> of <strong>{filteredCandidates.length}</strong> candidates
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
