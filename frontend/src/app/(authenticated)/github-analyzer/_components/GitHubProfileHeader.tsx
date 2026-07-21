"use client";

import { GithubProfile } from "@/data/github";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, BookOpen, RefreshCw, Share2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface GitHubProfileHeaderProps {
  profile: GithubProfile;
}

export function GitHubProfileHeader({ profile }: GitHubProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-sm">
        {/* Subtle Background Gradient */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar className="h-24 w-24 border-2 border-white dark:border-zinc-900 shadow-md ring-1 ring-zinc-200 dark:ring-zinc-800">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
            <AvatarFallback className="text-2xl font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  {profile.name}
                  <a
                    href={`https://github.com/${profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">@{profile.username}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="bg-white/50 dark:bg-zinc-900/50">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Re-Analyze
                </Button>
                <Button variant="outline" size="sm" className="bg-white/50 dark:bg-zinc-900/50">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50 font-semibold">{profile.followers}</strong> followers
                  {" · "}
                  <strong className="text-zinc-900 dark:text-zinc-50 font-semibold">{profile.following}</strong> following
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>
                  <strong className="text-zinc-900 dark:text-zinc-50 font-semibold">{profile.publicRepos}</strong> repos
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">AI Dev Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
                {profile.aiDeveloperScore}
              </span>
              <span className="text-sm font-semibold text-zinc-400">/100</span>
            </div>
            <Badge variant="outline" className="mt-2 bg-blue-50/50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              Top 5%
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
