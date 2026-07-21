"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AIShowcase() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Meet your AI Copilot
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              Let AI handle the heavy lifting while you focus on people.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
              Our advanced AI understands context, not just keywords. It reads resumes like a human would, extracting nuanced skills and experiences to match candidates to your job descriptions perfectly.
            </p>
            <ul className="space-y-4">
              {[
                "Automated candidate screening and scoring",
                "Instant candidate summaries and highlights",
                "Personalized email drafting and outreach",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">✓</span>
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6">
              {/* Chat interface mockup */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
                  <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                    Can you summarize David&apos;s experience with React?
                  </div>
                </div>
                
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 max-w-[85%]">
                    <p className="mb-2">David has 5 years of strong React experience:</p>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                      <li>Led migration to Next.js App Router at previous company</li>
                      <li>Built custom hooks and complex state management with Zustand</li>
                      <li>Optimized render performance by 40%</li>
                    </ul>
                    <p className="mt-2 text-blue-600 dark:text-blue-400 font-semibold">Match score: 95%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
