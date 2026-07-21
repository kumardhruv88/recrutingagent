"use client";

import { Interview } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Calendar, Video, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterviewTimelineProps {
  interviews: Interview[];
}

export function InterviewTimeline({ interviews }: InterviewTimelineProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return <Video className="h-4 w-4" />;
      case "Phone": return <Phone className="h-4 w-4" />;
      case "On-site": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video": return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Phone": return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "On-site": return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Upcoming Interviews
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="relative border-l-2 border-zinc-100 dark:border-zinc-800/80 ml-4 space-y-6">
            {interviews.map((interview, index) => (
              <motion.div 
                key={interview.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center border shadow-sm ${getTypeColor(interview.type)} transition-transform group-hover:scale-110 z-10`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer -mt-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
                      <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} className="object-cover" />
                      <AvatarFallback className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        {interview.candidateName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {interview.candidateName}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {interview.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                      {interview.time}
                    </div>
                    <div className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-sm border ${getTypeColor(interview.type)}`}>
                      {getTypeIcon(interview.type)}
                      {interview.type}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
