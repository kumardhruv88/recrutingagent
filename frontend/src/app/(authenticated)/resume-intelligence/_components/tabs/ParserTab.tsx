"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

interface ParserTabProps {
  data: ResumeAnalysis;
}

export function ParserTab({ data }: ParserTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-950">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{data.candidateName}</h1>
            <h2 className="text-xl text-zinc-500 mt-1 font-medium">{data.role}</h2>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <span>{data.parser.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>{data.parser.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{data.parser.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                <ExternalLink className="h-4 w-4" />
                <span>{data.parser.personalInfo.linkedin}</span>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-zinc-400" />
              Work Experience
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
              {data.parser.experience.map((exp, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white dark:border-zinc-950 bg-blue-100 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 dark:bg-blue-900/50 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{exp.title}</h4>
                      <span className="text-xs font-medium text-zinc-500 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{exp.duration}</span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                          <span className="text-zinc-400 mt-1.5 text-[10px]">●</span>
                          <span dangerouslySetInnerHTML={{
                            __html: highlight
                              .replace('Next.js', '<mark class="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded px-1">Next.js</mark>')
                              .replace('React', '<mark class="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded px-1">React</mark>')
                              .replace('Tailwind CSS', '<mark class="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded px-1">Tailwind CSS</mark>')
                          }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-zinc-400" />
              Education
            </h3>
            
            <div className="space-y-4">
              {data.parser.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-1">
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{edu.degree}</h4>
                    <p className="text-sm text-zinc-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-medium text-zinc-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
