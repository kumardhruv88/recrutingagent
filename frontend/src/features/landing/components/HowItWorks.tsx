"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Upload, Users } from "lucide-react";

const steps = [
  {
    title: "Create Job",
    description: "Define your requirements, or let AI generate the perfect job description for you.",
    icon: FileText,
  },
  {
    title: "Upload Resumes",
    description: "Bulk upload applications or connect your existing ATS for seamless synchronization.",
    icon: Upload,
  },
  {
    title: "AI Analysis",
    description: "Our AI instantly parses, scores, and ranks candidates based on their fit for the role.",
    icon: CheckCircle2,
  },
  {
    title: "Hire Faster",
    description: "Review the best candidates, schedule interviews, and make confident hiring decisions.",
    icon: Users,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            How HireMind AI Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            A streamlined process designed to save you hours of manual work every week.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />

          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto bg-white dark:bg-zinc-900 border-4 border-white dark:border-zinc-950 rounded-full shadow-xl flex items-center justify-center relative z-10 mb-6 group">
                  <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-full transition-transform group-hover:scale-110" />
                  <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400 relative z-10" />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white dark:border-zinc-950">
                    {i + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>

                {/* Mobile connecting arrow */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-8 text-zinc-300 dark:text-zinc-700">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
