"use client";

import { InterviewSession } from "@/data/voice-interview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SessionTableProps {
  sessions: InterviewSession[];
  onJoin: (id: string) => void;
  onReview: (id: string) => void;
}

export function SessionTable({ sessions, onJoin, onReview }: SessionTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-100 font-medium">In Progress</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-medium border-zinc-200 dark:border-zinc-700">Scheduled</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-50 font-medium border border-blue-200 dark:border-blue-900/50">Completed</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (session: InterviewSession) => {
    if (session.status === "active") {
      return (
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" onClick={() => onJoin(session.id)}>
          <Play className="h-3.5 w-3.5 mr-2 fill-current" />
          Join Room
        </Button>
      );
    }
    if (session.status === "completed") {
      return (
        <Button size="sm" variant="outline" className="shadow-sm" onClick={() => onReview(session.id)}>
          <FileText className="h-3.5 w-3.5 mr-2" />
          Review Report
        </Button>
      );
    }
    return (
      <Button size="sm" variant="ghost" disabled>
        Wait for Start
      </Button>
    );
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
          <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
            <TableHead className="font-medium text-zinc-500">Candidate</TableHead>
            <TableHead className="font-medium text-zinc-500">Schedule</TableHead>
            <TableHead className="font-medium text-zinc-500">Status</TableHead>
            <TableHead className="font-medium text-zinc-500 text-center">AI Rating</TableHead>
            <TableHead className="text-right font-medium text-zinc-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id} className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
              <TableCell>
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">{session.candidateName}</div>
                  <div className="text-xs text-zinc-500">{session.candidateRole}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5" />
                  {session.scheduledTime}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(session.status)}
              </TableCell>
              <TableCell className="text-center">
                {session.status === "completed" && session.aiRating ? (
                  <span className={`inline-flex items-center justify-center font-bold ${session.aiRating >= 90 ? 'text-emerald-600 dark:text-emerald-400' : session.aiRating >= 75 ? 'text-amber-600 dark:text-amber-500' : 'text-zinc-600'}`}>
                    {session.aiRating}
                  </span>
                ) : (
                  <span className="text-zinc-400 text-sm">—</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {getActionButton(session)}
              </TableCell>
            </TableRow>
          ))}
          {sessions.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                No interviews found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
