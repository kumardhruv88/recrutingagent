"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI resume parsing work?",
    answer: "Our AI uses advanced Natural Language Processing (NLP) to read resumes like a human would. It goes beyond simple keyword matching to understand context, experience level, and nuanced skills, extracting them into structured data with over 99% accuracy.",
  },
  {
    question: "Can I integrate HireMind AI with my existing tools?",
    answer: "Yes! HireMind AI seamlessly integrates with popular calendar apps (Google Workspace, Outlook), email clients, and communication tools like Slack. We also offer APIs for custom enterprise integrations.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We employ enterprise-grade security including SOC2 compliance, end-to-end encryption, and strict role-based access controls. We never train our public AI models on your private candidate data.",
  },
  {
    question: "How does the platform prevent hiring bias?",
    answer: "Our AI is specifically trained to ignore demographic information and focus purely on skills, experience, and qualifications. We also provide 'bias alerts' to help you write more inclusive job descriptions and evaluate candidates fairly.",
  },
  {
    question: "Do I need technical skills to use the AI features?",
    answer: "Not at all. HireMind AI is designed to be completely intuitive. The AI acts as a helpful copilot in the background, offering insights and automating tasks through a simple, conversational interface.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-zinc-500 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-zinc-600 dark:text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
