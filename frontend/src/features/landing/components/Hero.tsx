"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-6"
            >
              <Star className="w-3 h-3 fill-current" />
              AI-Powered Hiring Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tight"
            >
              AI-Powered Hiring.{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Built for Modern Recruiters.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              HireMind AI automates resume screening, ranks candidates by fit, conducts AI interviews, and gives your team intelligent insights — so you can hire the right people, faster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold px-6 py-3.5 rounded-lg transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:-translate-y-0.5"
                aria-label="Book a demo"
              >
                <Play className="w-4 h-4 text-blue-600" />
                Book a Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((letter, i) => (
                  <div
                    key={letter}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: ["#2563EB", "#7C3AED", "#0891B2", "#059669"][i] }}
                    aria-hidden="true"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">2,000+</span> recruiters trust HireMind AI
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-900/10 dark:shadow-black/40 overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 h-6 bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-400 flex items-center px-3">
                  app.hiremind.ai/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5 space-y-4">
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Candidates", value: "1,248", color: "text-blue-600" },
                    { label: "Interviews", value: "84", color: "text-violet-600" },
                    { label: "Time Saved", value: "62%", color: "text-emerald-600" },
                  ].map((m) => (
                    <div key={m.label} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                      <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Candidate list */}
                <div className="space-y-2">
                  {[
                    { name: "Sarah Chen", role: "Senior Backend Engineer", score: 94, status: "Shortlisted" },
                    { name: "Marcus Johnson", role: "ML Engineer", score: 91, status: "Interview" },
                    { name: "Priya Sharma", role: "Product Designer", score: 88, status: "Review" },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{c.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{c.role}</p>
                      </div>
                      <div className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
                        {c.score}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight card */}
                <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">AI Insight</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        Sarah Chen&apos;s profile shows 94% match. Her distributed systems experience aligns with your requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-3 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Hired!</p>
                <p className="text-[10px] text-zinc-500">Sarah Chen · 3 days ago</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-3"
            >
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Time to Hire</p>
              <p className="text-xl font-bold text-blue-600">↓ 62%</p>
              <p className="text-[10px] text-zinc-500">vs. industry avg.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
