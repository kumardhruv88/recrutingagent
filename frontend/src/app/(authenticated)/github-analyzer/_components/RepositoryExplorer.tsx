"use client";

import { useState } from "react";
import { GithubRepository } from "@/data/github";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutGrid, List, Star, GitFork, Clock } from "lucide-react";

interface RepositoryExplorerProps {
  repositories: GithubRepository[];
}

export function RepositoryExplorer({ repositories }: RepositoryExplorerProps) {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");

  const filteredRepos = repositories.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase()) || 
    repo.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Repository Intelligence
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Search repositories..." 
              className="pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md p-1 bg-white dark:bg-zinc-900 shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 h-7 rounded-sm ${view === 'grid' ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 h-7 rounded-sm ${view === 'table' ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
              onClick={() => setView("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filteredRepos.map((repo) => (
              <Card key={repo.id} className="border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer overflow-hidden">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {repo.name}
                    </h4>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                      {repo.aiRating}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-1 line-clamp-2">
                    {repo.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-zinc-500 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        {repo.language}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider text-[11px] font-semibold">
                    <tr>
                      <th className="px-6 py-4">Repository</th>
                      <th className="px-6 py-4">Language</th>
                      <th className="px-6 py-4">Stars</th>
                      <th className="px-6 py-4 hidden md:table-cell">Activity</th>
                      <th className="px-6 py-4 text-right">AI Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredRepos.map((repo) => (
                      <tr key={repo.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100">{repo.name}</div>
                          <div className="text-zinc-500 truncate max-w-xs">{repo.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 font-medium">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            {repo.language}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 font-medium">
                            <Star className="h-4 w-4 text-zinc-400" />
                            {repo.stars}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-zinc-500">
                            <Clock className="h-3.5 w-3.5" />
                            {repo.updatedAt}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50">
                            {repo.aiRating}/100
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
