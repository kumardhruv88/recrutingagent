"use client";

import { useState } from "react";
import { Job, mockJobs } from "@/data/jobs";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, LayoutGrid, List, MoreVertical, MapPin, Users, Briefcase, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { CreateJobWizard } from "./CreateJobWizard";

export function JobsList() {
  const [view, setView] = useState<"table" | "card">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "Published": return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 border-none">Published</Badge>;
      case "Draft": return <Badge className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 border-none">Draft</Badge>;
      case "Internal": return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 border-none">Internal</Badge>;
      case "Closed": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 border-none">Closed</Badge>;
      case "On Hold": return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 hover:bg-orange-100 border-none">On Hold</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Search jobs..." 
              className="pl-9 w-full bg-white dark:bg-zinc-950"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-full sm:w-[160px] bg-white dark:bg-zinc-950">
              <Filter className="h-4 w-4 mr-2 text-zinc-500" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${view === 'card' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}
              onClick={() => setView("card")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-2 ${view === 'table' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}
              onClick={() => setView("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <CreateJobWizard />
        </div>
      </div>

      {/* Content View */}
      {view === "table" ? (
        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                    No jobs found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow key={job.id} className="group">
                    <TableCell>
                      <div className="flex flex-col">
                        <Link href={`/jobs/${job.id}`} className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline">
                          {job.title}
                        </Link>
                        <span className="text-sm text-zinc-500">{job.department} • {job.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400">{job.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-zinc-400" />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{job.applicationsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4 text-zinc-500" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem render={<Link href={`/jobs/${job.id}`}>View Details</Link>} />
                          <DropdownMenuItem>Duplicate Job</DropdownMenuItem>
                          <DropdownMenuItem>Copy Link</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <div className="col-span-full h-32 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-500">
              No jobs found matching your filters.
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/jobs/${job.id}`} className="block h-full">
                  <Card className="h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm hover:shadow-md cursor-pointer flex flex-col group relative overflow-hidden">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        {getStatusBadge(job.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger render={
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" onClick={(e) => e.preventDefault()}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          } />
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem render={<Link href={`/jobs/${job.id}`}>View Details</Link>} />
                            <DropdownMenuItem>Duplicate Job</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 mb-6">
                        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                          <Briefcase className="mr-1.5 h-3.5 w-3.5" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                          <MapPin className="mr-1.5 h-3.5 w-3.5" />
                          {job.location}
                        </div>
                      </div>
                      
                      <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                        <div>
                          <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Users className="h-3 w-3" /> Applications</p>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{job.applicationsCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><BrainCircuit className="h-3 w-3" /> AI Score</p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400">{job.aiScore}% Avg</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
