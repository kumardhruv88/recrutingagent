"use client";

import { motion } from "framer-motion";
import { Clock, TrendingDown, Trophy, Zap } from "lucide-react";

const benefits = [
  {
    title: "Faster Hiring",
    description: "Reduce time-to-hire by up to 50% through automated resume screening and candidate ranking.",
    icon: Clock,
  },
  {
    title: "Reduced Cost",
    description: "Lower your cost-per-hire by eliminating manual tasks and streamlining the recruitment process.",
    icon: TrendingDown,
  },
  {
    title: "Better Candidates",
    description: "Identify hidden gems and top performers with semantic matching that looks beyond keywords.",
    icon: Trophy,
  },
  {
    title: "AI Explainability",
    description: "Full transparency into why a candidate was ranked highly, ensuring fair and unbiased hiring.",
    icon: Zap,
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Illustration / Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-violet-600 p-8 text-white shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Transform your hiring</h3>
              <div className="space-y-6">
                {[
                  { label: "Manual Screening", before: "Hours", after: "Seconds", icon: Clock },
                  { label: "Candidate Quality", before: "Average", after: "Top Tier", icon: Trophy },
                  { label: "Bias Mitigation", before: "Low", after: "High", icon: ShieldCheck },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white/90">{stat.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60 line-through">{stat.before}</p>
                      <p className="font-bold text-white">{stat.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Why leading teams choose HireMind AI
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
              We built HireMind AI to solve the biggest challenges in modern recruitment. Experience the benefits of an AI-first platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                    <benefit.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline icon for the stats card
function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
