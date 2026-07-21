"use client";

import { motion } from "framer-motion";
import { BrainCircuit, LineChart, MessageSquare, Search, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    title: "Resume Intelligence",
    description: "Instantly parse and extract structured data from thousands of resumes with over 99% accuracy.",
    icon: Search,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
  },
  {
    title: "Candidate Ranking",
    description: "Automatically score and rank candidates based on job descriptions using semantic matching.",
    icon: LineChart,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
  },
  {
    title: "AI Copilot",
    description: "Your intelligent assistant for drafting emails, creating job descriptions, and summarizing profiles.",
    icon: BrainCircuit,
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
  },
  {
    title: "Interview Assistant",
    description: "Generate tailored interview questions and evaluate candidate responses in real-time.",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
  },
  {
    title: "Hiring Pipeline",
    description: "Visualize and manage your entire hiring process with customizable kanban boards.",
    icon: Zap,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400",
  },
  {
    title: "Bias Reduction",
    description: "Identify and mitigate unconscious bias in job descriptions and candidate evaluations.",
    icon: ShieldCheck,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Everything you need to hire top talent
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            HireMind AI combines an enterprise-grade ATS with state-of-the-art artificial intelligence to streamline your entire recruitment workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
