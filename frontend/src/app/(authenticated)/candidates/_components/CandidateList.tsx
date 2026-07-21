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
      case "New": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Screening": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Interview": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Assessment": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Offer": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Hired": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
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
              className="flex items-center gap-2 mr-2"
            >
              <span className="text-sm font-medium text-zinc-500">{selectedIds.size} selected</span>
              <Button variant="outline" size="sm" className="h-9 gap-2"><Mail className="h-4 w-4"/> Email</Button>
              <Button variant="outline" size="sm" className="h-9 gap-2"><Download className="h-4 w-4"/> Export</Button>
              <Button variant="outline" size="sm" className="h-9 gap-2 text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4"/> Reject</Button>
            </motion.div>
          )}
          <div className="flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 p-1 bg-zinc-50 dark:bg-zinc-900/50">
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
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={selectedIds.size === filteredCandidates.length && filteredCandidates.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Match</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedIds.has(candidate.id)}
                        onCheckedChange={() => toggleSelect(candidate.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <Link href={`/candidates/${candidate.id}`} className="font-medium hover:underline">
                            {candidate.name}
                          </Link>
                          <div className="text-xs text-zinc-500">{candidate.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{candidate.appliedJob}</div>
                      <div className="text-xs text-zinc-500">{candidate.experience}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border-transparent ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                        candidate.aiScore >= 90 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                        candidate.aiScore >= 80 ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50" :
                        "text-zinc-600 bg-zinc-50 dark:bg-zinc-900"
                      }`}>
                        {candidate.aiScore}%
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {candidate.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
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
                          <DropdownMenuItem className="text-red-600">Reject Candidate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/candidates/${candidate.id}`} className="font-semibold text-lg hover:underline line-clamp-1">
                          {candidate.name}
                        </Link>
                        <div className="text-xs text-zinc-500">{candidate.location}</div>
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedIds.has(candidate.id)}
                      onCheckedChange={() => toggleSelect(candidate.id)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">{candidate.appliedJob}</div>
                      <div className="text-xs text-zinc-500">{candidate.experience} experience</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`border-transparent ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </Badge>
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${
                        candidate.aiScore >= 90 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                        candidate.aiScore >= 80 ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50" :
                        "text-zinc-600 bg-zinc-50 dark:bg-zinc-900"
                      }`}>
                        AI: {candidate.aiScore}%
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {candidate.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                          +{candidate.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-zinc-500">
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
